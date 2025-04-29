import { Request, Response } from 'express';
import { Appointment } from '../Models/AppointmentModel';
import {AppointmentStatus} from '../Models/AppointmentModel';

export const createAppointment = async (req: Request, res: Response): Promise<any> => {
    try {
      const { professionalId, userId, date, reason } = req.body;
  
      if (!professionalId || !userId || !date) {
        return res.status(400).json({ message: 'Champs requis manquants' });
      }
  
      const appointmentDate = new Date(date);
    
       // ✅ Vérification : pas de rendez-vous le dimanche
    const dayOfWeek = appointmentDate.getDay(); // 0 = dimanche
    if (dayOfWeek === 0) {
      return res.status(400).json({ message: 'Aucun rendez-vous n’est autorisé le dimanche.' });
    }

      // Vérifier si un rdv existe déjà à ce créneau
      const existing = await Appointment.findOne({
        professional: professionalId,
        date: appointmentDate,
        status: { $ne: AppointmentStatus.CANCELLED }  // Pas de rdv annulé à ce créneau
      });
  
      if (existing) {
        return res.status(409).json({ message: 'Ce créneau est déjà pris' });
      }
  
      const newAppointment = new Appointment({
        professional: professionalId,
        user: userId,
        date: appointmentDate,
        reason,
        status: AppointmentStatus.PENDING,  // Initialiser le statut sur "pending"
      });
  
      await newAppointment.save();
  
      res.status(201).json({
        message: 'Rendez-vous créé avec succès',
        data: newAppointment
      });
    } catch (error) {
      console.error('❌ Erreur création rendez-vous :', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };
  //confirmer rendez-vous de la part du professionel
  export const confirmAppointment = async (req: Request, res: Response): Promise<any> => {
    try {
      const { appointmentId } = req.params;
  
      const appointment = await Appointment.findById(appointmentId);
  
      if (!appointment) {
        return res.status(404).json({ message: "Rendez-vous introuvable" });
      }
  
      // Mettre à jour le statut
      appointment.status = AppointmentStatus.CONFIRMED;
      await appointment.save();
  
      res.status(200).json({
        message: "Rendez-vous confirmé",
        data: appointment
      });
    } catch (error) {
      console.error("❌ Erreur lors de la confirmation :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };//on peut ici envoyer un email à l'utilisateur 


  //annuler rendez-vous 
  export const cancelAppointment = async (req: Request, res: Response): Promise<any> => {
    try {
      const { appointmentId } = req.params;
  
      const appointment = await Appointment.findById(appointmentId);
  
      if (!appointment) {
        return res.status(404).json({ message: "Rendez-vous introuvable" });
      }
  
      appointment.status = AppointmentStatus.CANCELLED;
      await appointment.save();
  
      res.status(200).json({
        message: "Rendez-vous annulé",
        data: appointment
      });
    } catch (error) {
      console.error("❌ Erreur lors de l'annulation :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

//update rendez-vous tant qu'il n'est pas confirmé ou annulé
  export const updateAppointmentByUser = async (req: Request, res: Response): Promise<any> => {
    try {
      const { appointmentId } = req.params;
      const { userId, newDate, newReason } = req.body;
  
      if (!userId) {
        return res.status(400).json({ message: "Champs requis manquants" });
      }
  
      const appointment = await Appointment.findById(appointmentId);
  
      if (!appointment) {
        return res.status(404).json({ message: "Rendez-vous introuvable" });
      }
  
      if (appointment.user.toString() !== userId) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }
  
      if (appointment.status === AppointmentStatus.CONFIRMED || appointment.status === AppointmentStatus.CANCELLED) {
        return res.status(400).json({ message: "Impossible de modifier un rendez-vous confirmé ou annulé" });
      }
  
      // Vérifie si un rendez-vous existe déjà à la nouvelle date
      if (newDate) {
        const parsedDate = new Date(newDate);
  
        const existing = await Appointment.findOne({
          professional: appointment.professional,
          date: parsedDate,
          _id: { $ne: appointment._id },
          status: { $ne: AppointmentStatus.CANCELLED }
        });
  
        if (existing) {
          return res.status(409).json({ message: "Ce créneau est déjà réservé" });
        }
  
        appointment.date = parsedDate;
      }
  
      if (newReason) {
        appointment.reason = newReason;
      }
  
      appointment.status = AppointmentStatus.PENDING; // repasse en attente après modification
      await appointment.save();
  
      res.status(200).json({
        message: "Rendez-vous mis à jour avec succès",
        data: appointment
      });
    } catch (error) {
      console.error("❌ Erreur update rendez-vous :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  };

/**
 * Récupère la liste paginée des rendez-vous confirmés d’un professionnel,
 * avec la possibilité de filtrer par :
 * - Jour de la semaine (ex : "lundi")
 * - Date précise (ex : "2025-04-20")
 * - Mois (ex : "2025-04")
 */
  export const getConfirmedAppointement = async (req: Request, res: Response): Promise<any> => {
    try {
      const { professionalId, page = 1, perPage = 10 } = req.query;
      let keyword = req.query.keyword;
  
      if (!professionalId) {
        return res.status(400).json({ message: "ID du professionnel manquant" });
      }
  
      const pageNumber = parseInt(page as string) || 1;
      const perPageNumber = parseInt(perPage as string) || 10;
      const skip = (pageNumber - 1) * perPageNumber;
  
      const query: any = {
        professional: professionalId,
        status: AppointmentStatus.CONFIRMED,
      };
  
      const orConditions: any[] = [];
  
      // ✅ Sécurisation du keyword
      if (typeof keyword !== "string" && Array.isArray(keyword)) {
        keyword = keyword[0];
      }
  
      if (typeof keyword === "string") {
        const keywordLower = keyword.toLowerCase();
  
        const dayMap: Record<string, number> = {
          dimanche: 1,
          lundi: 2,
          mardi: 3,
          mercredi: 4,
          jeudi: 5,
          vendredi: 6,
          samedi: 7,
        };
  
        // Cas 1 : Jour de la semaine
        if (dayMap[keywordLower]) {
          query.$expr = {
            $eq: [{ $dayOfWeek: "$date" }, dayMap[keywordLower]],
          };
        }
        // Cas 2 : Date exacte
        else if (!isNaN(Date.parse(keyword))) {
          const date = new Date(keyword);
          const nextDay = new Date(date);
          nextDay.setDate(date.getDate() + 1);
  
          orConditions.push({
            date: { $gte: date, $lt: nextDay },
          });
        }
        // Cas 3 : Mois
        else if (/^\d{4}-\d{2}$/.test(keyword)) {
          const start = new Date(`${keyword}-01`);
          const end = new Date(start);
          end.setMonth(start.getMonth() + 1);
  
          orConditions.push({
            date: { $gte: start, $lt: end },
          });
        }
  
        if (orConditions.length > 0) {
          query.$or = orConditions;
        }
      }
  
      const total = await Appointment.countDocuments(query);
  
      const confirmedAppointments = await Appointment.find(query)
        .sort({ date: 1 })
        .skip(skip)
        .limit(perPageNumber);

        if (confirmedAppointments.length === 0) {
          return res.status(404).json({
            message: `Aucun rendez-vous trouvé pour le mot-clé : ${keyword}`,
            data: [],
          });
        }
      return res.status(200).json({
        message: "Liste des rendez-vous confirmés récupérée avec succès",
        data: confirmedAppointments,
        total,
        page: pageNumber,
        perPage: perPageNumber,
        totalPages: Math.ceil(total / perPageNumber),
      });
     
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous confirmés :", error);
      res.status(500).send("Erreur serveur");
    }
  };
  
  //getPending appointment 
  export const getPendingAppointment = async (req: Request, res: Response): Promise<any> => {
    try {
      const { professionalId, keyword, page = 1, perPage = 10 } = req.query;
  
      if (!professionalId) {
        return res.status(400).json({ message: "ID du professionnel manquant" });
      }
  
      const pageNumber = parseInt(page as string) || 1;
      const perPageNumber = parseInt(perPage as string) || 10;
      const skip = (pageNumber - 1) * perPageNumber;
  
      const query: any = {
        professional: professionalId,
        status: AppointmentStatus.PENDING,
      };
  
      const orConditions: any[] = [];
  
      // Sécurisation du keyword
      let keywordStr = "";
      if (typeof keyword === "string") {
        keywordStr = keyword;
      } else if (Array.isArray(keyword)) {
        keywordStr = keyword[0] as string;
      }
  
      if (keywordStr) {
        const keywordLower = keywordStr.toLowerCase();
  
        const dayMap: Record<string, number> = {
          dimanche: 1,
          lundi: 2,
          mardi: 3,
          mercredi: 4,
          jeudi: 5,
          vendredi: 6,
          samedi: 7,
        };
  
        // Cas 1 — Jour de la semaine
        if (dayMap[keywordLower]) {
          query.$expr = {
            $eq: [{ $dayOfWeek: "$date" }, dayMap[keywordLower]],
          };
        }
        // Cas 2 — Date exacte
        else if (!isNaN(Date.parse(keywordStr))) {
          const date = new Date(keywordStr);
          const nextDay = new Date(date);
          nextDay.setDate(date.getDate() + 1);
  
          orConditions.push({
            date: { $gte: date, $lt: nextDay },
          });
        }
        // Cas 3 — Mois (YYYY-MM)
        else if (/^\d{4}-\d{2}$/.test(keywordStr)) {
          const [year, month] = keywordStr.split('-').map(Number);
  
          // Premier jour du mois (UTC)
          const start = new Date(Date.UTC(year, month - 1, 1));
          // Premier jour du mois suivant (UTC)
          const end = new Date(Date.UTC(year, month, 1));
  
          // Correction de la fin du mois : ajouter un jour à la fin du mois pour couvrir toute la journée
          end.setDate(end.getDate() + 1); // Aller jusqu'à la fin du mois (23h59m59s)
  
          // Logs pour la plage de dates
          console.log("🔎 Plage de dates pour le mois : ", start.toISOString(), " à ", end.toISOString());
  
          orConditions.push({
            date: { $gte: start, $lt: end },
          });
        }
  
        // Log de la requête MongoDB avant d'exécuter
        console.log("🔎 Requête MongoDB : ", JSON.stringify(query, null, 2));
  
        if (orConditions.length > 0) {
          query.$or = orConditions;
        }
      }
  
      const total = await Appointment.countDocuments(query);
      const pendingAppointments = await Appointment.find(query)
        .sort({ date: 1 })
        .skip(skip)
        .limit(perPageNumber);
  
      if (pendingAppointments.length === 0) {
        return res.status(404).json({
          message: `Aucun rendez-vous trouvé pour le mot-clé : ${keywordStr}`,
          data: [],
        });
      }
  
      return res.status(200).json({
        message: "Liste des rendez-vous en attente récupérée avec succès",
        data: pendingAppointments,
        total,
        page: pageNumber,
        perPage: perPageNumber,
        totalPages: Math.ceil(total / perPageNumber),
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous en attente :", error);
      res.status(500).send("Erreur serveur");
    }
  };
  //to fix recherche par moi 