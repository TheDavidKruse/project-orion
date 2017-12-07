exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contacts').del()
    .then(function() {
      // Inserts seed entries
      return knex('contacts').insert([
      {
        "first_name": "John",
        "last_name": "Snow",
        "email": "thewatch@thewall",
        "company_name": "Nights watch",
        "position": "lord commander",
        "industry_id": 10,
        "date_meeting": "Mon Jul 17 2017",
        "meeting": "meetup",
        "synopsis": "He was tall dark and handsome I felt my knees get weak in his very presence",
        "follow_up": "he sent a raven my way",
        "student_id": 1
      },
      {
        "first_name": "Spider",
        "last_name": "Man",
        "email": "thespideyh@thewall",
        "company_name": "Webby watch",
        "position": "Superhero",
        "industry_id": 11,
        "date_meeting": "Mon Jul 18 2017",
        "meeting": "hackathon",
        "synopsis": "He was agile and swift I felt my knees get weak in his very presence",
        "follow_up": "he sent a webs my way",
        "student_id": 1
      },
      {
        "first_name": "Frodo",
        "last_name": "Baggins",
        "email": "TheShire@LordoftheRings",
        "company_name": "The fellowship of the ring",
        "position": "ring bearer",
        "industry_id": 12,
        "date_meeting": "Mon Jul 17 2017",
        "meeting": "meet at rivendale",
        "synopsis": "He popped out of nowhere it was like he was invisable",
        "follow_up": "Gandolf came and found me",
        "student_id": 2
      },
      {
        "first_name": "bob",
        "last_name": "the builder",
        "email": "canwebuildit@yeswecan",
        "company_name": "Bobs building",
        "position": "The builder",
        "industry_id": 13,
        "date_meeting": "Mon Jul 17 2017",
        "meeting": "He was building stuff",
        "synopsis": "This guy wouldnt stop asking me if we can build it",
        "follow_up": "weve been building programs",
        "student_id": 3
      },
      {
        "first_name": "Bruce",
        "last_name": "Wayne",
        "email": "Imnotbatman@totallynot",
        "company_name": "Not batman",
        "position": "Batman",
        "industry_id": 14,
        "date_meeting": "Mon Jul 17 2017",
        "meeting": "I was needing saving and this guy showed up",
        "synopsis": "I know he says hes not batman but I kinda think hes batman ",
        "follow_up": "he showed up in the bat mobile",
        "student_id": 4
      }


     ]);
    });
};
