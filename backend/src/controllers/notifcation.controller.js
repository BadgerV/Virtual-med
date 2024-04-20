import { catchAsync } from "../common/utils/errorHandler.js";
import Notification from "../models/NotificationSchema.js";

export const getNotificationFromID = catchAsync(async (req, res) => {
  const { id } = req.parms;

  const foundNotification = Notification.findOne({ _id: id });

  res.send(foundNotification);
});


