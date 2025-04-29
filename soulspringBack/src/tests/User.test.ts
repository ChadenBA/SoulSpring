import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../index"; 
import { User } from "../Models/UsersModel";
import  server  from "../index"; 
import bcrypt from "bcryptjs";
import cloudinary from "../Config/cloudinary";
import path = require("path");
jest.mock("../Models/UsersModel", () => {
  const actualUser = jest.requireActual("../Models/UsersModel");
  return {
    ...actualUser,
    create: jest.fn(actualUser.create), // Garde create() réel
  };
});
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  try {
    // Déconnecte toute connexion existante avant de créer une nouvelle
    await mongoose.disconnect();

    // Démarre une base de données MongoDB en mémoire
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Connecte Mongoose à cette base de données en mémoire
    await mongoose.connect(mongoUri);
    console.log("Connexion réussie à MongoMemoryServer");
  } catch (error) {
    console.error("Erreur lors de la connexion à MongoDB Memory Server", error);
  }
}, 60000); // Augmente le timeout pour éviter des erreurs Jest

afterEach(async () => {
  // Nettoie la base après chaque test
  await User.deleteMany();
});


afterAll(() => {
  server.close(); // Ferme le serveur après tous les tests
});

afterEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers(); // Remet les timers à la normale
  jest.clearAllTimers(); // Nettoie les timers ouverts
});

afterAll(async () => {
  try {
    // Supprime la base et ferme la connexion proprement
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  } catch (error) {
    console.error("Erreur lors de la fermeture de la connexion MongoDB", error);
  }
});

// Test : Création d'un utilisateur standard
describe("POST /users/signup", () => {
  it("devrait créer un utilisateur standard et retourner un token", async () => {
    const allUsers = await User.find();
console.log("Tous les utilisateurs avant test :", allUsers);

    const res = await request(app)
      .post("/users/signup")
      .send({
        name: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password123A#]",
        role: "user",
        age: 25,
      });

    // Vérifications des réponses
    console.log("Statut reçu:", res.statusCode);
    console.log("Réponse complète de l'API:", res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    console.log("Token: ", res.body.token);
    expect(res.body.user).toHaveProperty("id");
   
  });
});


// Test : Création d'un professionnel avec tous les attributs
describe("POST /users/signup", () => {
  it("devrait créer un professionnel et retourner un token", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({
        name: "Professeur",
        lastname: "Doe",
        email: "prof.doe@example.com",
        password: "password123A#]",
        role: "professional",
        age: 40,
        specialite: "Psychologue",
        description: "Je suis un psychologue expérimenté",
        contact: 1234567890,
      });

    // Vérifications des réponses
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    console.log("Token: ", res.body.token);
   expect(res.body.user).toHaveProperty("_id"); 
  });
});

//création d'un utilisateur avec image 
describe("POST /users/signup", () => {
  it("devrait créer un utilisateur avec une image", async () => {
    const imagePath = path.join(__dirname, "../assets/user.png");
    console.log("Chemin de l'image de test:", imagePath);

    const res = await request(app)
      .post("/users/signup")
      .attach("image", imagePath) 
      .field("name", "John")
      .field("lastname", "Doe")
      .field("email", "john.doe@example.com")
      .field("password", "password123A#]")
      .field("role", "user")
      .field("age", "25");
   
      console.log("Server response:", res.body);
    
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('profilePicture');
      expect(res.body.user.profilePicture.url).toMatch(/cloudinary/);
   
  });
});


describe("Tests de création d'un utilisateur avec des champs manquants", () => {
  
  // Test pour un champ manquant
  it("devrait échouer si le champ 'name' est manquant", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "user",
        age: 25,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Champs manquants");
  });

  it("devrait échouer si le champ 'lastname' est manquant", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({
        name: "John",
        email: "john.doe@example.com",
        password: "password123",
        role: "user",
        age: 25,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Champs manquants");
  });

  it("devrait échouer si le champ 'email' est manquant", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({
        name: "John",
        lastname: "Doe",
        password: "password123",
        role: "user",
        age: 25,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Champs manquants");
  });

  it("devrait échouer si le champ 'password' est manquant", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({
        name: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        role: "user",
        age: 25,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Champs manquants");
  });

  it("devrait échouer si le champ 'role' est manquant", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({
        name: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        age: 25,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Champs manquants");
  });

  it("devrait échouer si le champ 'age' est manquant", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({
        name: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "user",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Champs manquants");
  });
   // Test pour un cas spécifique à un "Professional" (role 'Professional')
   it("devrait échouer si un champ spécifique à 'Professional' est manquant", async () => { //cas tous les champs spécifique au proessional sont manquants
    const res = await request(app)
      .post("/users/signup")
      .send({
        name: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "professional",
        age: 25,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Champs manquants pour le professionnel");
  });

  it("devrait échouer si 'specialite' est manquant pour un 'Professional'", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({
        name: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "professional",
        age: 25,
        description: "Professionnel de santé",
        contact: "contact@john.com"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Champs manquants pour le professionnel");
  });

  it("devrait échouer si 'description' est manquant pour un 'Professional'", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({
        name: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "professional",
        age: 25,
        specialite: "Psychologist",
        contact: "contact@john.com"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Champs manquants pour le professionnel");
  });

  it("devrait échouer si 'contact' est manquant pour un 'Professional'", async () => {
    const res = await request(app)
      .post("/users/signup")
      .send({
        name: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "professional",
        age: 25,
        specialite: "Psychologist",
        description: "Professionnel de santé"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Champs manquants pour le professionnel");
  });
});

//tester mot de passe trop court
describe("POST /users - Mot de passe trop court", () => {
  it("should return 400 if the password is too short", async () => {
    const response = await request(app)  
      .post("/users/signup") // Endpoint d'inscription
      .send({
        name: "John",
        lastname: "Doe",
        email: "doe.doe@example.com",
        password: "12345", 
        role: "user",
        age: 30,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Mot de passe trop court (min. 8 caractères)");
  });
});

//cas d'un simple utilisateur
describe("POST /users", () => {
  it("should return 400 if the email already exists pour l'utilisateur", async () => {
    // Simuler un utilisateur existant dans la base de données
    User.findOne = jest.fn().mockResolvedValue({
      email: "existing.email@example.com",
    });

    const response = await request(app)  // Remplacer par votre instance d'application Express
      .post("/users/signup") // Votre route pour créer un utilisateur
      .send({
        name: "John",
        lastname: "Doe",
        email: "existing.email@example.com", // Email déjà existant
        password: "password123",
        role: "user",
        age: 30,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email déjà utilisé");
  });
});

//cas d'un professinal : tester email existe
describe("POST /users", () => {
  it("should return 400 if the email already exists pour le professionel", async () => {
    // Simuler un utilisateur existant dans la base de données
    User.findOne = jest.fn().mockResolvedValue({
      email: "existing.email@example.com",
    });

    const response = await request(app)  
      .post("/users/signup") 
      .send({
        name: "John",
        lastname: "Doe",
        email: "existing.email@example.com", // Email déjà existant
        password: "password123",
        role: "User",
        age: 30,
        specialite: "Psychologue",
        description: "Je suis un psychologue expérimenté",
        contact: 1234567890,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email déjà utilisé");
  });
});
describe("POST /users - Absence de JWT_SECRET", () => {
  let originalJwtSecret: string | undefined;

  beforeAll(() => {
    // Sauvegarde la valeur originale de JWT_SECRET et la supprime temporairement
    originalJwtSecret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;
  });
  afterAll(() => {
    // Restaure la valeur originale après les tests
    process.env.JWT_SECRET = originalJwtSecret;
  });
  it("should return 500 if JWT_SECRET is not defined", async () => {
    const response = await request(app)
      .post("/users/signup")
      .send({
        name: "John",
        lastname: "Doe",
        email: "jj.doe@example.com",
        password: "password123",
        role: "user",
        age: 30,
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("JWT_SECRET is not defined in environment variables");
  });
});