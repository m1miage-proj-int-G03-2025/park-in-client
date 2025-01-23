"use client";

import { typesOpts } from "@/constants/typesOpts";
import { useMemo, useState } from "react";
import * as MaterialIcons from "react-icons/md";
import { timeOpts } from "@/constants/timeOpts";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import InputField from "@/components/inputField";
import axios from "axios";

const RechercheParkingView = () => {
  const route = useRouter()
  const [reservationInfo, setReservationInfo] = useState({
    addresse: "",
    date: typeof window === 'undefined' ? new Date() : null,
    duree: "",
    typeVoiture: "",
  });
  const [errors, setErrors] = useState({
    addresse: false,
    date: false,
    duree: false,
    typeVoiture: false,
  });


  const [villes, setVilles] = useState<Array<{ label: string; value: string }>>([])

  const handleInputChange = (val: string) => {
    axios.get(`https://geo.api.gouv.fr/communes?nom=${val}&fields=departement&boost=population&limit=5`).then(({data}) => {
      setVilles(data?.map((item: { nom: string; code: string }) => ({
        label: item.nom,
        value: item.code,
      })))
    })   
  }

  const handleSelection = (key: string, value: string | Date) => {
    console.log(value);
    setErrors((prev) => {
      return {
        ...prev,
        [key]: false,
      };
    });

    setReservationInfo((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };


const handleRechercheClick = () => {
    if(!reservationInfo.addresse || !reservationInfo.date || !reservationInfo.duree || !reservationInfo.typeVoiture) {
      const newError = {
        addresse: !reservationInfo.addresse,
        date: !reservationInfo.date,
        duree: !reservationInfo.duree,
        typeVoiture: !reservationInfo.typeVoiture,
      };
      
      setErrors(newError);
      return;
    }
    const queryString = encodeURIComponent(JSON.stringify(reservationInfo));
    route.push(`/parkings?searchQuery=${queryString}`);
}

  const fields: Array<{
    label: string;
    iconName?: keyof typeof MaterialIcons;
    inputType?: "text" | "datetime-local" | "select";
    placeholder: string;
    value: string | Date | null;
    onChange: (value: string | Date ) => void;
    options?: { label: string; value: string }[];
    error?: boolean;
  }> = useMemo(() => {
    return [
      {
        label: "Date de début",
        inputType: "datetime-local",
        placeholder: "Date de début",
        value: reservationInfo.date,
        onChange: (value: string | Date ) => handleSelection("date", value),
        error: errors.date,
      },
      {
        label: "Durée",
        inputType: "select",
        iconName: "MdSchedule",
        placeholder: "Durée",
        value: reservationInfo.duree,
        onChange: (value: string | Date) => handleSelection("duree", value),
        options: timeOpts,
        error: errors.duree,
      },
      {
        label: "Type de place",
        iconName: "MdLocalParking",
        inputType: "select",
        placeholder: "Type de place",
        value: reservationInfo.typeVoiture,
        onChange: (value: string | Date) => handleSelection("typeVoiture", value),
        options: typesOpts,
        error: errors.typeVoiture,
      },
    ];
  }, [reservationInfo, errors, villes]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden">
      <div className="absolute inset-0 bg-primary mt-20">
        <svg
          className="absolute bottom-0 left-0 w-full h-[800px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,64L48,96C96,128,192,192,288,224C384,256,480,256,576,240C672,224,768,192,864,180C960,168,1056,128,1152,100C1248,72,1344,60,1392,50L1440,40V320H0Z"
          ></path>
        </svg>
      </div>
      <div className="relative w-[1024px] z-10 flex flex-col items-center h-2/3">
       <span className="mb-7 font-semibold text-3xl text-white items-center">Recherchez des parkings</span>
       <div className="items-center mb-5">
       <span className="font-normal text-xl 2xl:text-3xl text-white items-center">Trouver une place de parking n`a jamais été aussi simple</span>
       </div>
        <div className="flex items-center justify-center gap-4 p-4 mb-5 w-[550px]">
          <div className="flex-1">
            <InputField
              label="Ville"
              iconName="MdLocationOn"
              inputType="auto-complete"
              options={villes}
              placeholder="Indiquez votre emplacement"
              value={reservationInfo.addresse}
              onChange={(value) => handleSelection("addresse", value)}
              error={errors.addresse}
              onInputChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex gap-4 w-full justify-center mb-10">
          {fields.map((field, index) => (
            <div key={index} className="flex-1 w-[300px] flex flex-col">
              <InputField
                label={field.label}
                iconName={field.iconName}
                inputType={field.inputType}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
                options={field.options || []}
                error={field.error || false}
              />
            </div>
          ))}
        </div>
        <Button
          className="mt-4 px-14 py-6 bg-secondary text-white rounded-full text-lg font-semibold shadow-xl"
          onClick={handleRechercheClick}
        >
          Rechercher des places parking
        </Button>
      </div>
    </div>
  );
};

export default RechercheParkingView;
