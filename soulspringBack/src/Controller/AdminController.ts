import { Request, Response } from "express";
import { Professional } from "../Models/professionalModel";
import { sendAcceptanceEmail } from "../Utils/email"; 
import { User } from "../Models/UsersModel";

// Admin approves  a professional

export const  approveProfessional = async (req: Request, res: Response): Promise<any> => {
  try {
      const { id } = req.params;

      const professional = await Professional.findByIdAndUpdate(
          id,
          { isApproved: true }, 
          { new: true } 
      );
      
      if (!professional) {
          return res.status(404).json({ message: "Professional not found" });
      }

          // Send an email   if the professional is approved
    if (professional.isApproved) {
      await sendAcceptanceEmail(professional.email); 
      console.log("Approval email sent to:", professional.email);
    } else {
      console.log("Professional rejected, no email sent.");
    }
      res.status(200).json({ message: "Professional approved successfully", professional });
  } catch (error) {
      console.error("Error approving professional:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
}
// Admin approves  a professional
export const  rejectProfessional = async (req: Request, res: Response): Promise<any> =>{
  try {
      const { id } = req.params;

      const professional = await Professional.findByIdAndDelete(id);

      if (!professional) {
          return res.status(404).json({ message: "Professional not found" });
      }

      res.status(200).json({ message: "Professional rejected and deleted successfully" });
  } catch (error) {
      console.error("Error rejecting and deleting professional:", error);
      res.status(500).json({ message: "Internal Server Error"});
  }
}






// Get all approved professionals
export const getApprovedProfessionals = async (req: Request, res: Response): Promise<any> => {
  try {
    const { keyword } = req.query;
    const query: any = { isApproved: true };

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } }, // Case-insensitive search by name
        { email: { $regex: keyword, $options: "i" } }, // Search in email as well
      ];
    }
    const approvedProfessionals = await Professional.find(query);

    res.status(200).json({
      message: "Fetched all  approved professionals successfully",
      data: approvedProfessionals, // Wrap the data in an object
      total: approvedProfessionals.length, // Optionally include total count
    });
  } catch (error) {
    console.error("Error fetching approved professionals:", error);
    res.status(500).send("Server error");
  }
};



// Get all non-approved professionals
export const getNonApprovedProfessionals = (req: Request, res: Response): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { keyword } = req.query;
      const query: any = { isApproved: false };

      if (keyword) {
        query.$or = [
          { name: { $regex: keyword, $options: "i" } }, // Case-insensitive search by name
          { email: { $regex: keyword, $options: "i" } }, // Search in email as well
        ];
      }

      const nonApprovedProfessionals = await Professional.find(query);

      resolve(
        res.status(200).json({
          message: "Fetched all non-approved professionals successfully",
          data: nonApprovedProfessionals,
          total: nonApprovedProfessionals.length,
        })
      );
    } catch (error) {
      console.error("Error fetching non-approved professionals:", error);
      reject(res.status(500).send("Server error"));
    }
  });
};



export const getAllPros = (req: Request, res: Response): Promise<any> => {
  return new Promise(async (resolve, reject) => {
      try {
          const { keyword, page = 1, perPage = 10 } = req.query;

          const query: any = {}; // Ensure query is properly typed

          if (keyword) {
              query.$or = [
                  { name: { $regex: keyword, $options: "i" } }, // Case-insensitive search
                  { email: { $regex: keyword, $options: "i" } } // Search in email too
              ];
          }

          const totalCount = await Professional.countDocuments(query);
          const professionals = await Professional.find(query)
              .skip((Number(page) - 1) * Number(perPage))
              .limit(Number(perPage));

          resolve(
              res.json({
                  data: professionals,
                  meta: { count: totalCount, page: Number(page), perPage: Number(perPage) },
              })
          );
      } catch (error) {
          console.error(error);
          reject(res.status(500).json({ message: "Server error" }));
      }
  });
};



// Get all users 
export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const allUsers = await User.find(); 
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).send("Server error");
  }
};

// Suspend or unsuspend a professional
export const suspendProfessional= async (req: Request, res: Response): Promise<any> =>  {
  try {
      const { id } = req.params;

      // Example of suspending a professional
      const professional = await Professional.findByIdAndUpdate(id, { isSuspended: true });

      if (!professional) {
          return res.status(404).json({ message: "Professional not found" });
      }

      res.status(200).json({ message: "Professional suspended successfully" });
  } catch (error) {
      console.error("Error suspending professional:", error);
      res.status(500).json({ message: "Internal Server Error"});
  }
}


export const getPorforPropage = async (req: Request, res: Response): Promise<any> => {
  try {
    const { keyword, page = 1, perPage = 10, sortBy, sortOrder, isSuspended, isApproved } = req.query;

    const query: any = {}; // Initialize the query object

    // Filtering based on suspended status
    if (isSuspended !== undefined) {
      query.isSuspended = isSuspended === "false";  // Convert string 'true'/'false' to boolean
    }

    // Filtering based on approval status
    if (isApproved !== undefined) {
      query.isApproved = isApproved === "true"; // Convert string 'true'/'false' to boolean
    }

    // Searching by keyword (name or email)
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } }, // Case-insensitive search by name
        { email: { $regex: keyword, $options: "i" } }, // Case-insensitive search by email
      ];
    }

    // Sorting based on the `sortBy` and `sortOrder` parameters
    let sort: any = {};
    if (sortBy) {
      if (sortBy === "name") {
        sort.name = sortOrder === "desc" ? -1 : 1; // A-Z or Z-A
      } else if (sortBy === "publishDate") {
        sort.createdAt = sortOrder === "desc" ? -1 : 1; // New to old or old to new
      }
    }

    const totalCount = await Professional.countDocuments(query); // Get the total count of records
    const professionals = await Professional.find(query)
      .sort(sort) // Apply sorting
      .skip((Number(page) - 1) * Number(perPage)) // Pagination
      .limit(Number(perPage));

    res.json({
      data: professionals,
      meta: { count: totalCount, page: Number(page), perPage: Number(perPage) },
    });
  } catch (error) {
    console.error("Error fetching professionals:", error);
    res.status(500).json({ message: "Server error" });
  }
};









export const unsuspendProfessional= async (req: Request, res: Response): Promise<any> =>  {
  try {
      const { id } = req.params;

      // Example of suspending a professional
      const professional = await Professional.findByIdAndUpdate(id, { isSuspended: false });

      if (!professional) {
          return res.status(404).json({ message: "Professional not found" });
      }

      res.status(200).json({ message: "Professional unsuspended successfully" });
  } catch (error) {
      console.error("Error suspending professional:", error);
      res.status(500).json({ message: "Internal Server Error"});
  }
}


