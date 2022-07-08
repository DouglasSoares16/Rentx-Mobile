import React from "react";
import { Calendar as CustomCalendar, LocaleConfig, CalendarProps } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { ptBR } from "./LocaleConfig";

LocaleConfig.locales['pt-br'] = ptBR;

LocaleConfig.defaultLocale = "pt-br";

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disabledTouchEvent?: boolean;
  }
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const { colors, fonts } = useTheme();

  return (
    <CustomCalendar
      renderArrow={direction =>
        <Feather
          size={24}
          color={colors.text}
          name={direction == "left" ? "chevron-left" : "chevron-right"} />
      }

      headerStyle={{
        backgroundColor: colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10
      }}

      theme={{
        textDayFontFamily: fonts.primary_400,
        textDayHeaderFontFamily: fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        textMonthFontFamily: fonts.secondary_600,
        monthTextColor: colors.title,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}

      firstDay={1}
      minDate={new Date().toString()}

      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export {
  Calendar,
  MarkedDateProps, 
  DayProps,
}