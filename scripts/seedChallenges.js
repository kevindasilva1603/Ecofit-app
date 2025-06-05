const db = require('../src/models/challengeModel');

const seedChallenges = () => {
  const challenges = [
    {
      title: "Marcher 10 km",
      description: "Fais 10 km de marche cette semaine",
      goal_type: "distance",
      goal_value: 10,
      start_date: "2025-06-01",
      end_date: "2025-06-07",
    },
    {
      title: "3 activités",
      description: "Effectue 3 sessions sportives",
      goal_type: "activités",
      goal_value: 3,
      start_date: "2025-06-01",
      end_date: "2025-06-30",
    }
  ];

  challenges.forEach(ch => {
    db.run(
      `INSERT INTO challenges (title, description, goal_type, goal_value, start_date, end_date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [ch.title, ch.description, ch.goal_type, ch.goal_value, ch.start_date, ch.end_date],
      function (err) {
        if (err) {
          console.error("❌ Erreur :", err.message);
        } else {
          console.log(`✅ Défi ajouté : ${ch.title}`);
        }
      }
    );
  });
};

seedChallenges();
