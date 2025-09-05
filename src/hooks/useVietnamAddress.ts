import { useState, useEffect } from "react";

interface Province {
  code: number;
  name: string;
  districts: District[];
}

interface District {
  code: number;
  name: string;
  wards: Ward[];
}

interface Ward {
  code: number;
  name: string;
}

export function useVietnamAddress() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then(res => res.json())
      .then((data: Province[]) => setProvinces(data))
      .catch(err => console.error("Failed to fetch provinces:", err));
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const province = provinces.find(p => p.code.toString() === code);
    setDistricts(province ? province.districts : []);
    setWards([]);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const district = districts.find(d => d.code.toString() === code);
    setWards(district ? district.wards : []);
  };

  return {
    provinces,
    districts,
    wards,
    handleCityChange,
    handleDistrictChange,
  };
}
