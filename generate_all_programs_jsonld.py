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
    programs_data = json.load(f)

# Convert dict of programs to a list if needed
if isinstance(programs_data, dict):
    programs_data = [
        {"name": name, **details} for name, details in programs_data.items()
    ]

# Validate structure after normalization
if not isinstance(programs_data, list) or not programs_data:
    raise ValueError("No program data found or JSON is not an array.")

# === BUILD ITEMLIST ===
item_list = []
for i, program in enumerate(programs_data, start=1):
    name = program.get("name", "").strip()
    url = program.get("url", "").strip()
    cip = program.get("cip", "").strip()

    list_item = {
        "@type": "ListItem",
        "position": i,
        "url": url,
        "item": {
            "@type": "EducationalOccupationalProgram",
            "name": name,
            "identifier": {
                "@type": "PropertyValue",
                "propertyID": "CIP Code",
                "value": cip
            },
            "provider": provider
        }
    }
    item_list.append(list_item)

# === FINAL JSON-LD ===
collection_jsonld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": collection_name,
    "url": collection_url,
    "numberOfItems": len(item_list),
    "itemListElement": item_list
}

# === WRITE OUTPUT ===
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(collection_jsonld, f, ensure_ascii=False, indent=2)

print(f"✅ JSON-LD generated: {output_file} ({len(item_list)} programs)")
