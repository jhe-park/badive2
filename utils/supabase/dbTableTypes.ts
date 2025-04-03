import { Database } from "./database.types";

type DBTable = Database["public"]["Tables"];

export type TypeDBbye = DBTable["bye"]["Row"];
export type TypeDBfaq = DBTable["faq"]["Row"];
export type TypeDBinstructor = DBTable["instructor"]["Row"];
export type TypeDBnotification = DBTable["notification"]["Row"];
export type TypeDBorder = DBTable["order"]["Row"];
export type TypeDBpending_sessions = DBTable["pending_sessions"]["Row"];
export type TypeDBprofiles = DBTable["profiles"]["Row"];
export type TypeDBprogram = DBTable["program"]["Row"];
export type TypeDBrequest = DBTable["request"]["Row"];
export type TypeDBrequestInstructor = DBTable["requestInstructor"]["Row"];
export type TypeDBreservation = DBTable["reservation"]["Row"];
export type TypeDBresort = DBTable["resort"]["Row"];
export type TypeDBtimeslot = DBTable["timeslot"]["Row"];
export type TypeDBtour = DBTable["tour"]["Row"];
export type TypeDBtour_input = DBTable["tour_input"]["Row"];
