import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CoursesListSkeleton from './coursesListSkeleton/CoursesListSkeleton';
import NoDataFound from '@components/noDataFound/NoDataFound';
import { profListProps } from './coursesList.type';
import ProfessionalCard from '@features/courses/coursesCard/ProfessionalCard';

function CoursesList({ prof, isLoading }: profListProps) {
  const { t } = useTranslation();

  console.log('Prof:', prof);

  // Si la liste des professionnels est vide
  if (prof?.length === 0) return <NoDataFound message={t('home.no_professional_found')} />;

  // Si les données sont en cours de chargement
  if (isLoading) return <CoursesListSkeleton />;

  const handleUpdate = () => {
    // Logique pour mettre à jour un professionnel
  };

  const handleDelete = () => {
    // Logique pour supprimer un professionnel
  };

  


  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center" justifyContent="center">
      {prof?.map((professional, index) => {
        console.log("Professionallllllllllllllll:", professional); // Debugging
        console.log("idd iciiiiiiiiiii ",professional.id);
        console.log("url profilepictureeeeeeeeeeeeee",professional.profilePicture);

        
      // Vérification si profilePicture est un objet avec les propriétés url
      const profilePictureUrl = typeof professional.profilePicture === 'string'
      ? professional.profilePicture // Si c'est déjà une chaîne (URL)
      : professional.profilePicture?.url || "src/assets/images/noUser.png"; // Sinon, on prend profilePicture.url

     //hadouma les informations elli fi carte : nafshom ouput postman
        return (
          <ProfessionalCard
            width="45vh"
            key={(professional.id) || index}  // Fallback sur index si _id est undefined
            id={(professional.id)}
            profilePicture={profilePictureUrl}   // Fallback si undefined
            name={professional.name || "Nom inconnu"}
            lastname={professional.lastname || "lastename"}
            email={professional.email || "Email non disponible"}
            specialite={professional.specialite || " specilite Non spécifié"}
            address={professional.address || "Adresse inconnue"}
          />
        );
      })}
    </Stack>
  );
  
}

export default CoursesList;
