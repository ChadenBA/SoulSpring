import type { Config } from 'jest';

const config: Config = {
  preset: "ts-jest",
  globals:{"projet_name":"SoulSpring"},
  testTimeout: 60000,
  bail:5,//arréter l'éxécution aprés 5 échecs
  verbose:true,//affiche les rapports de test individuelle pendant l'éxecution du test
  testEnvironment: "node",
  testMatch: [ '**/tests/**/*.test.ts' // Assure-toi que tes fichiers de test sont dans ce répertoire
], // Définit où Jest doit chercher les tests
};

export default config;