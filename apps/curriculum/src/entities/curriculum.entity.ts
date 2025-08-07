export class Subject {
  id: string;
  name: string;
  units: number;
}

export class Curriculum {
  studentId: string;
  studentName: string;
  courseCode: string;
  subjectId: string[];
}
