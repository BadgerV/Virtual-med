import mongoose from "mongoose";
import StaffSchema from "./staffSchema";

export default Staff = mongoose.model("Staff", StaffSchema);
