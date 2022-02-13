import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import BackpackRoundedIcon from "@mui/icons-material/BackpackRounded";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";
import React, { useState } from "react";

import ListItem from "@components/reusable/ListItem";

const Sidebar = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  return (
    <div className="h-screen w-[20%] border-r-2 border-secondary flex flex-col justify-between items-start bg-white">
      <div className="flex flex-col justify-around w-full">
        <span className="mx-2 my-3 text-base font-bold cursor-pointer">Cal.com</span>
        <div className="mx-5">
          <ul className="w-full">
            <ListItem
              url="/"
              imageUrl={<AttachmentOutlinedIcon width={20} height={20} className="-rotate-45" />}
              title="Event Types"
            />
            <ListItem
              url="/events"
              imageUrl={<BackpackRoundedIcon width={20} height={20} />}
              title="Bookings"
            />
            <ListItem
              url="#"
              imageUrl={<AccessTimeRoundedIcon width={20} height={20} />}
              title="Availability"
            />
            <ListItem
              url="#"
              imageUrl={<IntegrationInstructionsOutlinedIcon width={20} height={20} />}
              title="Integrations"
            />
            <ListItem url="#" imageUrl={<SettingsIcon width={20} height={20} />} title="Settings" />
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        {isLoggingOut && (
          <button
            className="w-[80%] px-3 py-2 bg-secondary"
            onClick={() => {
              setIsLoggingOut(false);
              router.push("/api/auth/signout");
            }}>
            Logout
          </button>
        )}
        <div
          className="w-[80%] cursor-pointer hover:bg-secondary mx-auto mb-5 rounded  py-3  flex flex-row items-center justify-between px-3"
          onClick={() => setIsLoggingOut(!isLoggingOut)}>
          <div className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer">
            <AccountCircleRoundedIcon width={32} height={32} className="cursor-pointer" />
          </div>
          <div className="flex flex-col items-center justify-center w-[50%]">
            <span className="text-xs">dushimeemma</span>
            <span className="text-xs">cal.com/dushimeemma</span>
          </div>
          <div className="flex flex-col items-center justify-center cursor-pointer">
            <KeyboardArrowUpRoundedIcon width={12} height={12} className="cursor-pointer" />
            <KeyboardArrowDownRoundedIcon width={12} height={12} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
