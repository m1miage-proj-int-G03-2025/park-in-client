"use client";

import { typesOpts } from "@/constants/typesOpts";
import { useMemo, useState } from "react";
import InputField from "./components/input-field";
import * as MaterialIcons from "react-icons/md";
import { timeOpts } from "@/constants/timeOpts";
import { Button, Input } from "@heroui/react";
import { colors } from "@/constants/colors";
import { useRouter } from "next/navigation";

const RechercheParkingView = () => {
  const route = useRouter()
  const [reservationInfo, setReservationInfo] = useState({
    addresse: "",
    date: new Date(),
    duree: "",
    typeVoiture: "",
  });
  const [errors, setErrors] = useState({
    addresse: false,
    date: false,
    duree: false,
    typeVoiture: false,
  });

  const handleSelection = (key: string, value: string | Date) => {
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
    value: string | Date;
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
  }, [reservationInfo, errors]);

  return (
    <div
      style={{
        backgroundImage: "url('/bg-search-page.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "70%",
        }}>
<div
    style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        marginBottom: "20px",
        width: "550px",
    }}>
    <div style={{ flex: 1 }}> 
        <InputField
            label="Adresse"
            iconName="MdLocationOn"
            inputType="text"
            placeholder="Indiquez votre emplacement"
            value={reservationInfo.addresse}
            onChange={(value) => handleSelection("addresse", value)} 
            error={errors.addresse}
        />
    </div>
</div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          width: "100%",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        {fields.map((field, index) => (
          <div
            key={index}
            style={{
              flex: "1",
              width: "300px",
              display: "flex",
              flexDirection: "column",
            }}
          >
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
        style={{
          marginTop: "1rem",
          padding: "25px 30px",
          backgroundColor: colors.main,
          color: "#fff",
          borderRadius: "25px",
          fontSize: "18px",
          fontWeight: "600",
          alignSelf: "center",
        }}
        onClick={handleRechercheClick}
      >
        Rechercher des places parking
      </Button>
    </div>
    </div>
  );
};

export default RechercheParkingView;
