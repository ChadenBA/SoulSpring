# Importation des bibliothèques nécessaires
import os  # Pour naviguer dans les fichiers du système
import json  # Pour lire les fichiers JSON
import pandas as pd  # Pour manipuler les données sous forme de DataFrame
import re  # ✅ Import pour nettoyer les textes (expression régulière)
import stanza  # Pour le traitement du langage naturel (NLP)
from sklearn.feature_extraction.text import TfidfVectorizer  # Pour la vectorisation du texte
from sklearn.metrics.pairwise import cosine_similarity  # Pour calculer la similarité cosinus

# ✅ Fonction pour nettoyer les textes (minuscule, sans ponctuation)
def clean_text(text):
    text = text.lower()  # Conversion en minuscule
    text = re.sub(r'[^\w\s]', '', text)  # Suppression de la ponctuation
    return text.strip()  # Retirer les espaces inutiles aux bords

# Fonction de prétraitement des données
def preprocess_data(folder_path):
    data_list = []  # Liste pour stocker les données nettoyées

    # Parcours des fichiers dans le dossier spécifié
    for filename in os.listdir(folder_path):
        if filename.endswith('.json'):  # Ne traiter que les fichiers JSON
            file_path = os.path.join(folder_path, filename)  # Construction du chemin du fichier
            # ✅ Lecture du fichier avec utf-8-sig pour éviter l'erreur de BOM
            with open(file_path, 'r', encoding='utf-8-sig') as f:
                data = json.load(f)  # Chargement des données JSON

                # Parcours des éléments du fichier JSON
                for item in data:
                    if "Question" in item and "Réponse" in item:  # Vérification des clés
                        # Ajout des paires Question-Réponse à la liste
                        data_list.append({
                            "Question": item["Question"],
                            "Réponse": item["Réponse"]
                        })

    # Création d'un DataFrame à partir de la liste
    df = pd.DataFrame(data_list)

    # ✅ Ajout d'une colonne nettoyée 'question_clean' pour éviter le KeyError
    df['question_clean'] = df['Question'].apply(clean_text)

    # ✅ Optionnel : vérifier le contenu
    print(df.head())  # Affichage des premières lignes du DataFrame
    print(df.columns)  # Affichage des colonnes du DataFrame

    return df  # Retourner le DataFrame avec les données prétraitées

# Initialiser le pipeline Stanza pour le nettoyage de texte
stanza.download('en')  # Téléchargez le modèle de langue anglaise (ou autre langue si nécessaire)
nlp = stanza.Pipeline('en')  # Initialisation du pipeline Stanza pour l'anglais

# Fonction de nettoyage de texte entrée pour faire la similarité
def clean_text_with_stanza(text):
    doc = nlp(text)  # Analyse du texte avec Stanza
    cleaned_text = " ".join([word.text for sent in doc.sentences for word in sent.words])  # Récupération du texte propre
    return cleaned_text  # Retourner le texte nettoyé

# Fonction de réponse simple
def get_response(user_input, df):
    # Nettoyage de la question de l'utilisateur
    user_input_clean = clean_text_with_stanza(user_input)
    
    # Créer le corpus de questions
    corpus = df["question_clean"].tolist()
    corpus.append(user_input_clean)  # Ajouter la question de l'utilisateur

    # Initialiser le vecteur TF-IDF
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(corpus)  # Appliquer la transformation TF-IDF sur le corpus

    # Calculer la similarité cosinus entre la question de l'utilisateur et les questions existantes
    similarity = cosine_similarity(X[-1], X[:-1])

    # Trouver l'index de la question la plus similaire
    idx = similarity.argmax()
    score = similarity[0, idx]  # Score de similarité

    # Si la similarité est trop faible, retourner une réponse par défaut
    if score < 0.3:
        return "Désolé, je n’ai pas bien compris votre question."
    
    # Retourner la réponse correspondante à la question la plus similaire
    return df["Réponse"].iloc[idx]
