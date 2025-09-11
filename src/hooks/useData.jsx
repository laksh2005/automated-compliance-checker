import {useState,useEffect} from 'react'

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

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const req= await fetch("/compliance.json")
        const data = await req.json();
        setData(data)
      }
      catch(err){
        console.log(err);
      }
    }
    fetchData()
  },[])
  useEffect(()=>{
    const categoriser = () => {
     const compliant= Data.filter(item => item.compliant === true);
     const nonCompliant= Data.filter( (item)=>{
        if(item.compliant_score < 50) return item;
     });
     const flagged = Data.filter( (item)=>{
        if(item.compliant_score >= 50) return item;
     });
     const manufacturerMissing = Data.filter(item => item.manufacturer_name === false || item.manufacturer_address === false);
     const netquantityMissing = Data.filter(item => item.net_quantity === false);
     const mrpMissing = Data.filter(item => item.retail_price === false);
     const consumerCareMissing = Data.filter(item => item.consumer_care_details === false);
     const manufacturerDateMissing = Data.filter(item => item.manufacture_import_date === false);
     const countryOriginMissing = Data.filter(item => item.country_of_origin === false);

     const totalScore = Data.reduce((sum, item) => sum + item.compliant_score, 0);
     const averageCompliance = Data.length > 0 ? Math.round(totalScore / Data.length) : 0;
     
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
    }
    categoriser()
  },[Data])
  return {Data, flaggedProducts, compliantProducts, nonCompliantProducts, manufacturermissing, netquantitymissing, mrpmissing, consumerCareMissing, manufacturerDateMissing, countryOriginMissing, overrallCompliance};
}

export default useData