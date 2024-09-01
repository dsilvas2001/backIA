import { SubjectEntity } from "../../domain";
import { CustomError } from "../errors/custom.error";

export class SubjectMapper {
  static userEntityFromObject(subject: any): SubjectEntity {
    return new SubjectEntity(
      subject._id.toString(),
      subject.subjectName,
      subject.courseId._id.toString(), // Asegúrate de que `courseId` esté presente
      subject.courseId.courseName
    );
  }
}
