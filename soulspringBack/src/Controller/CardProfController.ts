import { Request, Response } from "express";
import { Professional } from "../Models/professionalModel";
//import { SortOrder } from 'mongodb'; // Assurez-vous d'importer le type SortOrder depuis MongoDB



// Get  professionals approved and not suspendu
export const getProfessionalsForCard = async (req: Request, res: Response): Promise<void> => {
  try {
      console.log("✅ API getProfessionalsForCard appelée !");
      console.log("🛠️ Paramètres reçus :", req.query);

      const keyword = typeof req.query.keyword === "string" ? req.query.keyword.trim() : "";
      const page = Number(req.query.page) || 1;
      const perPage = Number(req.query.perPage) || 8;

      const orderBy = (req.query.orderBy as string) || "created_at";
      const directionRaw = (req.query.direction as string)?.toLowerCase();
      const direction = directionRaw === "asc" ? 1 : -1; // par défaut: DESC

      console.log("🔍 Mot-clé extrait:", keyword);
      console.log("🔍 Page:", page, "PerPage:", perPage);
      console.log("🔽 Tri sur :", orderBy, direction === 1 ? "ASC" : "DESC");

      const query: Record<string, any> = {
          isApproved: true,
          isSuspended: false
      };

      if (keyword.length > 0) {
          query.$or = [
              { name: { $regex: keyword, $options: "i" } },
              { lastname: { $regex: keyword, $options: "i" } },
              { address: { $regex: keyword, $options: "i" } }
          ];
          console.log("🔍 Requête MongoDB avec filtre par mot-clé:", JSON.stringify(query, null, 2));
      }

      const professionals = await Professional.find(query)
          .sort({ [orderBy]: direction })
          .skip((page - 1) * perPage)
          .limit(perPage);

      console.log('📋 Résultats trouvés:', professionals.length);

      if (professionals.length === 0) {
          console.log("🔍 Aucun professionnel trouvé avec la recherche:", query);
          res.status(404).json({ message: "Aucun professionnel trouvé." });
          return;
      }

      const results = professionals.map((prof) => ({
          _id: prof.id,
          profilePicture: prof.profilePicture || "pas d'image",
          name: prof.name,
          lastname: prof.lastname,
          email: prof.email,
          address: prof.address,
          specialite: prof.specialite,
      }));

      res.status(200).json({
          message: "Professionnels trouvés",
          data: results,
          meta: { page, perPage }
      });

  } catch (error) {
      console.error("❌ Erreur serveur:", error);
      res.status(500).json({ message: "Erreur serveur" });
  }
};