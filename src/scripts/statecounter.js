import fs from "fs";

const API_KEY = "AIzaSyC62Cg6PzbIHkeQL_v9IH8MpQ5WYSoiyEM";
const data = JSON.parse(fs.readFileSync("C:\\Users\\AMAN\\OneDrive\\Desktop\\Web Dev\\automated-compliance-checker\\public\\final.json", "utf-8"));

async function getState(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${
    address
  }&key=${API_KEY}`;
  const res = await fetch(url);
  const res1= await res.json()
  const result = res1.results[0];

  if (!result) return null;
  const state = result.address_components.find(c =>
    c.types.includes("administrative_area_level_1")
  );
  return state ? state.long_name : null;
}

(async () => {
  const stateCounts = {};

  for (const item of data) {
    if (item.manufacturer_address !== "False") {
      const state = await getState(item.manufacturer_address);
      if (state) {
        stateCounts[state] = (stateCounts[state] || 0) + 1;
      }
    }
  }

  fs.writeFileSync("stateCounts2.json", JSON.stringify(stateCounts, null, 2));
  console.log("✅ stateCounts2.json generated successfully!");
})();
