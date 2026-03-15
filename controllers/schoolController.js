const db = require("../config/db");
const getDistance = require("../utils/distance");

exports.addSchool = (req, res) => {

  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: "Latitude and Longitude must be numbers" });
  }

  const sql = "INSERT INTO schools (name,address,latitude,longitude) VALUES (?,?,?,?)";

  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "School added successfully",
      schoolId: result.insertId
    });
  });
};

exports.listSchools = (req, res) => {

  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "User latitude and longitude required" });
  }

  db.query("SELECT * FROM schools", (err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    const schools = results.map((school) => {

      const distance = getDistance(
        latitude,
        longitude,
        school.latitude,
        school.longitude
      );

      return {
        ...school,
        distance
      };
    });

    schools.sort((a, b) => a.distance - b.distance);

    res.json(schools);
  });
};