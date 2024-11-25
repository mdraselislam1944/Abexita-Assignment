export class CreateDoctorDto {
  id?: number;
  type?: string;
  orgOrPracticeId: string;
  usernameOrBusinessUrl: string;
  name: string;
  ranking: number;
  photo?: string;
  category: string;
  subCategory: string[];
  rating: number;
  totalAppointment: number;
  zones: string[];
  branches: string[];
  areaOfPractice: string;
}
