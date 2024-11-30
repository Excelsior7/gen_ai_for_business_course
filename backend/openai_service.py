import pandas as pd
import requests
from openai import OpenAI
import json
from dotenv import load_dotenv
import os


def categorize_reviews(reviews):
    reviews = pd.DataFrame(reviews)
    reviews_text_only = reviews.loc[reviews["textTranslated"].isna()==False,"textTranslated"].to_json(force_ascii=False)

    load_dotenv()
    OPEN_API_KEY = os.getenv('OPEN_API_KEY')
    client = OpenAI(api_key = OPEN_API_KEY)

    prompt_system = "Ton rôle est d'automatiquement catégoriser les avis d'une entreprise"
    prompt = f"""
    CONTEXT:
    Je vais te partager un fichier json qui contient un ensemble d'avis sur une entreprise. Tu dois interprêter le json comme suit {{"id":"commentaire"}}.

    TASK:
    Chaque avis est associé à un id. Ton objectif est de me donner en sortie un json avec deux éléments:
    1. Les catégories associées au commentaire.
    2. Si le commentaire est positif ou négatif. (Polarité)

    Concernant la taxonomie, tu as trois règles à respecter:
    1. Les catégories doivent couvrir tout l'espace des commentaires. Chaque commentaire doit être catégorisé. 
    2. Avoir le bon niveau de granularité pour faciliter les analyses. (Crée maximum 25 catégories)
    3. Maximiser la distance entre chaque catégorie, pour éviter la redondance.

    Note importante: Merci de tout traduire en anglais.

    FORMAT :
    {{"id du commentaire": [[catégorie #1, Polarité du commentaire concernant la catégorie #1],[catégorie #2, Polarité du commentaire concernant la catégorie #2],...]}}

    Note importante: Je souhaite uniquement le json en sortie, rien d'autre. Donc je ne veux pas l'annotation ```json par exemple.

    FICHIER JSON:
    {reviews_text_only}
    """

    response = client.chat.completions.create(model="gpt-4o-mini",
                                            messages=[{"role": "system", "content": prompt_system},
                                                        {"role": "user", "content": prompt}])


    reviews_categories = json.loads(response.choices[0].message.content)
    reviews_categories = pd.DataFrame(reviews_categories.items(),columns=["id","categories"])
    reviews_categories["id"] = reviews_categories["id"].astype(int)

    reviews = reviews_categories.join(reviews,on="id",how="right",lsuffix="_cat").set_index(keys="id")

    return json.loads(reviews.to_json(orient="records",force_ascii=False))