// Со Reference
// kolekcija na univerziteti
{
  "id": 1000,
  "univerzitet": "Kiril i Metodi",
  "fakulteti": [
    "2000", "5000"
  ]
}

{
  "id": 1000,
  "univerzitet": "FON",
  "fakulteti": [
    "3000", "4000"
  ]
}
// kolekcija na fakulteti
{
  "id": 2000,
  "fakultet": "Mashninski"
}

{
  "id": 3000,
  "fakultet": "bezbednos"
}
{
  "id": 4000,
  "fakultet": "kriminalistika"
}

{
  "id": 5000,
  "fakultet": "PMF"
}


// Embedded

{
  "id": 1000,
  "univerzitet": "Kiril i Metodi",
  "fakulteti": [
    {
      "id": 2000,
  "fakultet": "Mashninski"
    },
    {
     "id": 3000,
      "fakultet": "PMF"
    }
  ]
}