import json
from pathlib import Path

# === CONFIG ===
input_file = Path("programs_cip_url.json")
output_file = Path("all_programs_landing_jsonld.json")

collection_name = "All Academic Programs | Seattle University"
collection_url = "https://www.seattleu.edu/academics/all-programs/"

# === PROVIDER OBJECT (Full Organizational Info) ===
provider = {
    "@type": "CollegeOrUniversity",
    "@id": "https://www.seattleu.edu/#organization",
    "name": "Seattle University",
    "url": "https://www.seattleu.edu/",
    "logo": "https://www.seattleu.edu/media/seattle-university/site-assets/branding/seattleu-logo-300x300.png",
    "identifier": [
        {
            "@type": "PropertyValue",
            "propertyID": "IPEDS ID",
            "value": "236595"
        },
        {
            "@type": "PropertyValue",
            "propertyID": "OPE ID",
            "value": "00379000"
        }
    ],
    "sameAs": [
        "https://x.com/seattleu/",
        "https://www.facebook.com/seattleu/",
        "https://www.instagram.com/seattleu/",
        "https://www.linkedin.com/school/seattle-university/",
        "https://en.wikipedia.org/wiki/Seattle_University"
    ]
}

# === LOAD PROGRAM DATA ===
if not input_file.exists():
    raise FileNotFoundError(f"Input file not found: {input_file}")

with open(input_file, "r", encoding="utf-8") as f:
    programs = json.load(f)

# If JSON is a dict of programs keyed by name, convert it to a list
if isinstance(programs_data, dict):
    programs_data = [
        {"name": name, **details} for name, details in programs_data.items()
    ]

# Validate structure after normalization
if not isinstance(programs_data, list) or not programs_data:
    raise ValueError("No program data found or JSON is not an array.")

# === BUILD ITEMLIST ===
item_list = []
for i, p in enumerate(programs, start=1):
    name = p.get("programName", "").strip()
    url = p.get("programUrl", "").strip()
    cip = p.get("cipCode", "").strip()

    if not (name and url and cip):
        continue

    item_list.append({
        "@type": "ListItem",
        "position": i,
        "item": {
            "@type": "EducationalOccupationalProgram",
            "name": name,
            "url": url,
            "identifier": {
                "@type": "PropertyValue",
                "propertyID": "CIP 2020",
                "value": cip
            },
            "provider": provider
        }
    })

# === COMPOSE JSON-LD STRUCTURE ===
jsonld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": collection_name,
    "url": collection_url,
    "mainEntity": {
        "@type": "ItemList",
        "name": "All Academic Programs",
        "numberOfItems": len(item_list),
        "itemListOrder": "Unordered",
        "itemListElement": item_list
    }
}

# === SAVE OUTPUT ===
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(jsonld, f, indent=2, ensure_ascii=False)

print(f"✅ JSON-LD generated: {output_file} ({len(item_list)} programs)")
