import mongoose from "mongoose";
import { UserModel } from "../../data/mongodb/models/user.model";
import { UserDatasource, UserDto, UserEntity } from "../../domain";
import { BcryptAdapter } from "../adapters/bcrypts";
import { CustomError } from "../errors/custom.error";
import { UserMapper } from "../mappers/user.mapper";
import { CourseModel } from "../../data/mongodb/models/curso.model";
import { userSubjectModel } from "../../data/mongodb/models/user-subject.model";
import { RolModel } from "../../data/mongodb/models/rol.model";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class UserDatasourceImpl implements UserDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  /**
   *
   * @param userDto
   * @returns
   */
  async register(userDto: UserDto): Promise<UserEntity> {
    const { name, email, password, roles, courseName } = userDto;
    try {
      // Verificar si el correo existe
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest("email already exists");

      // Buscar el rol basado en el nombre del rol
      const role = await RolModel.findOne({ rolName: roles });
      if (!role) throw CustomError.badRequest("Role not found");

      // Buscar el ID del curso basado en el nombre del curso
      const course = await CourseModel.findOne({ courseName: courseName });
      if (!course) throw CustomError.badRequest("Course not found");

      console.log(course.courseName);
      console.log(course.id);
      // Crear el nuevo usuario con el rol y el curso
      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashPassword(password!),
        roles: role._id, // Asignar el ID del rol encontrado
      });

      // Asociar el usuario con el curso en la tabla userCourse
      await userSubjectModel.create({
        userId: user._id,
        courseId: course._id, // Asignar el ID del curso encontrado
      });
      const userWithCourse = {
        ...user.toObject(), // Convertir el documento de Mongoose a un objeto plano
        courseName: course.courseName, // Agregar el `courseName` al objeto
      };

      // Devolver la entidad de usuario creada
      return UserMapper.userEntityFromObject(userWithCourse);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  /**
   *
   * @returns
   */

  async findAll(): Promise<UserEntity[]> {
    try {
      // Encuentra todos los documentos en la colección userSubject
      const userSubjects = await userSubjectModel
        .find()
        .populate({
          path: "userId", // Referencia al modelo de usuario
          select: "name email password roles", // Selecciona los campos necesarios
          populate: { path: "roles", select: "rolName" }, // Poblamos el rol relacionado
        })
        .populate({
          path: "courseId", // Referencia al modelo de curso
          select: "courseName", // Selecciona el campo 'courseName'
        });

      if (!userSubjects.length) {
        throw CustomError.badRequest("No user subjects found");
      }

      return userSubjects.map((userSubject) => {
        const user = userSubject.userId as any; // Cast a 'any' to access properties
        const course = userSubject.courseId as any; // Cast a 'any' to access properties

        // Asegúrate de que 'roles' es un objeto que tiene 'rolName'
        const roleName = user.roles ? user.roles.rolName : "";

        // Construye la entidad de usuario con la información relacionada
        return new UserEntity(
          user._id.toString(),
          user.name,
          user.email,
          user.password,
          roleName,
          course.courseName
        );
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else if (error instanceof mongoose.Error) {
        throw CustomError.serverUnavailable(error.message);
      } else {
        throw CustomError.internalServer();
      }
    }
  }

  async findById(userId: string): Promise<UserEntity> {
    try {
      // Encuentra el documento en la colección userSubject por userId
      const userSubject = await userSubjectModel
        .findOne({ userId }) // Busca por userId
        .populate({
          path: "userId", // Referencia al modelo de usuario
          select: "name email password roles", // Selecciona los campos necesarios
          populate: { path: "roles", select: "rolName" }, // Poblamos el rol relacionado
        })
        .populate({
          path: "courseId", // Referencia al modelo de curso
          select: "courseName", // Selecciona el campo 'courseName'
        });

      if (!userSubject) {
        throw CustomError.badRequest("User subject not found");
      }

      const user = userSubject.userId as any; // Cast a 'any' para acceder a las propiedades
      const course = userSubject.courseId as any; // Cast a 'any' para acceder a las propiedades

      // Asegúrate de que 'roles' es un objeto que tiene 'rolName'
      const roleName = user.roles ? (user.roles as any).rolName : "";

      // Construye la entidad de usuario con la información relacionada
      return new UserEntity(
        user._id.toString(),
        user.name,
        user.email,
        user.password,
        roleName,
        course.courseName
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else if (error instanceof mongoose.Error) {
        throw CustomError.serverUnavailable(error.message);
      } else {
        throw CustomError.internalServer();
      }
    }
  }

  /**
   *
   * @param email
   * @param password
   * @returns
   */

  async findByCredentials(
    email: string,
    password: string
  ): Promise<UserEntity> {
    try {
      // Buscar al usuario por el correo electrónico
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw CustomError.badRequest("Invalid credentials");
      }

      // Comparar la contraseña proporcionada con la almacenada
      const isPasswordValid = this.comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw CustomError.badRequest("Invalid credentials");
      }

      // Si las credenciales son válidas, devolver el usuario
      return UserMapper.userAuthEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.internalServer();
      }
    }
  }

  async update(userId: string, updateDto: UserDto): Promise<UserEntity> {
    const { name, email, courseName } = updateDto;

    try {
      // Buscar el usuario por ID
      const user = await UserModel.findById(userId);
      if (!user) throw CustomError.badRequest("User not found");

      // Actualizar los campos del usuario
      if (name) user.name = name;
      if (email) user.email = email;

      // Guardar los cambios en la base de datos
      await user.save();

      // Aquí puedes realizar otras acciones, como actualizar el curso asociado

      // Obtener el usuario actualizado y la asociación con el curso
      const updatedUser = await UserModel.findById(userId).populate({
        path: "roles",
        select: "rolName",
      });

      // Aquí obtienes la información del curso asociado al usuario y lo devuelves
      // ...

      return UserMapper.userUpdateEntityFromObject(updatedUser!.toObject());
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
