import { PaginationResponse } from 'types/interfaces/Pagination';
import { ApiPaginationResponse } from '../type';
import { AppointmentApi } from './AppointmentApi.type';
import { Appointment } from 'types/models/Appointment';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { FieldValues } from 'react-hook-form';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import { toSnakeCase } from '@utils/helpers/string.helpers';

// Transformer une réponse paginée
export const transformFetchAppointmentResponse = (
  response: ApiPaginationResponse<AppointmentApi>
): PaginationResponse<Appointment> => {
  const data = Array.isArray(response.data) ? response.data : [];

  return {
    message: response.message || "No message provided",
    data: transformAppointments(data),
    meta: {
      currentPage: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
      total: data.length,
      count: data.length,
    },
  };
};

// Transformer une réponse simple
export const transformAppointmentResponse = (
  response: ItemDetailsResponse<AppointmentApi>
): ItemDetailsResponse<Appointment> => {
  if (!response.data) {
    return {
      message: response.message || "No data received",
      data: null,
    };
  }

  return {
    message: response.message,
    data: transformSingleAppointment(response.data),
  };
};

// Transformer un tableau
const transformAppointments = (data: AppointmentApi[]): Appointment[] => {
  return data.map((appointment) => transformSingleAppointment(appointment));
};

// Transformer un seul objet
export const transformSingleAppointment = (data: AppointmentApi): Appointment => {
  return {
    id:data.id,
    professionalid:data.professionalid , // L'id du professionnel
    userid: data.userid ,         // L'id de l'utilisateur qui prend rdv
    date: data.date ,                           // Date et heure du rdv
    status: data.status, // État du rdv
    reason: data.reason,  
  };
};

