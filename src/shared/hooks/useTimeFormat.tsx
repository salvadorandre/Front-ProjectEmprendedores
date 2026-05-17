// src/shared/hooks/useTimeFormat.ts

export const useTimeFormat = () => {
  const formatToAmPm = (time24: string): string => {
    if (!time24) return ""
    const [hours, minutes] = time24.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const hours12 = hours % 12 || 12
    return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`
  }

  const formatTo24h = (timeAmPm: string): string => {
    if (!timeAmPm) return ""
    const [time, period] = timeAmPm.split(" ")
    let [hours, minutes] = time.split(":").map(Number)
    if (period === "PM" && hours !== 12) hours += 12
    if (period === "AM" && hours === 12) hours = 0
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
  }

  return { formatToAmPm, formatTo24h }
}