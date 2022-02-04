import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import GoogleIcon from "@mui/icons-material/Google";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useQuery } from "react-query";

const Success = () => {
  const getAllEvents = async () => {
    const { data } = await axios.get("/api/events");
    return data;
  };

  const { data, isLoading } = useQuery("events", getAllEvents);

  if (isLoading) {
    return (
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-secondary">
      <div className="w-[40%] min-h-[60%] border-2 border-secondary bg-white flex flex-col justify-center items-center py-10">
        <CheckCircleRoundedIcon className="text-green-500 " style={{ width: 75, height: 75 }} />
        <span className="text-base font-bold">This meeting is scheduled</span>
        <span className="text-center">
          We emailed you and the other attendees a calendar invitation with all
          <br />
          the details.
        </span>
        <div className="h-px w-[90%] mx-auto bg-primary my-5" />
        <div className="flex flex-row justify-between items-start w-[90%] mb-5">
          <span className="text-base font-semibold w-[40%] -mt-2">What</span>
          <span>
            {data.data[0].eventType.duration} Min Meeting between {data.data[0].name} and
            {data.data[0].eventType.user.name}
          </span>
        </div>
        <div className="flex flex-row  items-start w-[90%] mb-5">
          <span className="-mt-2 text-base font-semibold w-[30%]">When</span>
          <span>
            {moment(`${data.data[0].date}`).format("MMMM Do YYYY")} <br />
            {data.data[0].time} - {data.data[0].eventType.duration}mins
            <span className="text-gray-400">(Africa/Kigali)</span>
          </span>
        </div>
        <div className="h-px w-[90%] mx-auto bg-primary my-5" />
        <div className="w-[90%] flex flex-row justify-between items-center">
          <span className="text-base font-semibold ">Add to calender</span>
          <button
            className="flex items-center justify-center w-12 h-12 border-2 border-primary"
            type="button">
            <GoogleIcon width={25} height={25} />
          </button>
        </div>
        <div className="h-px w-[90%] mx-auto bg-primary my-5" />
        <span className="mb-5 text-gray-400">Create your booking link with Cal.com</span>
        <div className="w-[90%] h-[2.5rem] flex flex-row border-2 border-primary">
          <input
            type="text"
            className="h-full w-[70%] px-3 py-2 border-0 outline-none focus:outline-none"
            placeholder="dushimeemma@gmail.com"
          />
          <button className="w-[30%] h-full bg-primary text-white flex justify-center items-center px-3 py-2">
            Try it for free
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
