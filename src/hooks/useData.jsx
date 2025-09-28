import { map } from 'framer-motion/client';
import { useState, useEffect } from 'react'

const useData = () => {
  const [Data, setData] = useState([]);
  const [flaggedProducts, setFlaggedProducts] = useState([]);
  const [compliantProducts, setCompliantProducts] = useState([]);
  const [nonCompliantProducts, setNonCompliantProducts] = useState([]);
  const [manufacturermissing, setManufacturermissing] = useState([]);
  const [netquantitymissing, setNetquantitymissing] = useState([]);
  const [mrpmissing, setMrpmissing] = useState([]);
  const [consumerCareMissing, setConsumerCareMissing] = useState([]);
  const [manufacturerDateMissing, setManufacturerDateMissing] = useState([]);
  const [countryOriginMissing, setCountryOriginMissing] = useState([]);
  const [overrallCompliance, setOverallCompliance] = useState(0);
  const [topCompliantBrands, setTopCompliantBrands] = useState([]);
  const [bottomNonCompliantBrands, setBottomNonCompliantBrands] = useState([]);
  const [mostcompliant, setMostcompliant] = useState([]);
  const [leastcompliant, setLeastcompliant] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch("/final.json")
        const data = await req.json();
        setData(data)
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchData()
  }, [])
  useEffect(() => {
    const categoriser = () => {
      const compliant = Data.filter(item => item.compliant === true);
      const nonCompliant = Data.filter((item) => {
        if (item.compliant_score < 50) return item;
      });
      const flagged = Data.filter((item) => {
        if (item.compliant_score >= 50 && item.compliant_score < 100) return item;
      });
      const manufacturerMissing = Data.filter(item => item.manufacturer_name === false || item.manufacturer_address === false || item.manufacturer_name==="False");
      const netquantityMissing = Data.filter(item => item.net_quantity === false || item.net_quantity==="False");
      const mrpMissing = Data.filter(item => item.retail_price === false || item.retail_price==="False");
      const consumerCareMissing = Data.filter(item => item.consumer_care_details === false || item.consumer_care_details==="False");
      const manufacturerDateMissing = Data.filter(item => item.manufacture_import_date === false || item.manufacture_import_date==="False");
      const countryOriginMissing = Data.filter(item => item.country_of_origin === false || item.country_of_origin==="False");

      const totalScore = Data.reduce((sum, item) => sum + item.compliant_score, 0);
      const averageCompliance = Data.length > 0 ? Math.round(totalScore / Data.length) : 0;

      let most_compliant = {};

      // Step 1: Group scores
      for (let item of Data) {
        let key;
        if (item.manufacturer_name) {
          key = item.manufacturer_name.split(" ")[0].toLowerCase();
        }

        if (!most_compliant[key]) {
          most_compliant[key] = [];
        }

        most_compliant[key].push(item.compliant_score);
      }

      // Step 2: Compute averages
      let averages = [];
      for (let company in most_compliant) {
        let scores = most_compliant[company];

        if (scores.length > 0) {
          let avg = scores.reduce((sum, val) => sum + val, 0) / scores.length;
          averages.push({ company, avg });
        }
      }

      // Step 3: Sort by average (high → low)
      averages.sort((a, b) => b.avg - a.avg);

      // Step 4: Top 5 and Bottom 5 (excluding avg = 0)
      let top5 = averages.slice(0, 5);
      let bottom5 = averages
        .filter(item => item.avg > 0) // remove 0 avg companies
        .slice(-5); // pick last 5


      setCompliantProducts(compliant);
      setOverallCompliance(averageCompliance);
      setNonCompliantProducts(nonCompliant);
      setFlaggedProducts(flagged);
      setManufacturermissing(manufacturerMissing);
      setNetquantitymissing(netquantityMissing);
      setMrpmissing(mrpMissing);
      setConsumerCareMissing(consumerCareMissing);
      setManufacturerDateMissing(manufacturerDateMissing);
      setCountryOriginMissing(countryOriginMissing);
      setTopCompliantBrands(top5);
      setBottomNonCompliantBrands(bottom5);
      setMostcompliant(top5);
      setLeastcompliant(bottom5);
    }
    categoriser()
  }, [Data])
  return { Data, flaggedProducts, compliantProducts, nonCompliantProducts, manufacturermissing, netquantitymissing, mrpmissing, consumerCareMissing, manufacturerDateMissing, countryOriginMissing, overrallCompliance, topCompliantBrands, bottomNonCompliantBrands, mostcompliant, leastcompliant };
}

export default useData