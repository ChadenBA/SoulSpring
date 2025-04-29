export interface ProfessionalCardProps {
  id: number;
  profilePicture?:string;
  name:string;
  lastname:string;
  email:string;
  specialite:string;
  address:string;
  width?: string;
  navigateToEditCoursePage?: (id: number) => void;
}
