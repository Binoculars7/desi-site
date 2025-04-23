import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase"; // your firebase config
import { Crown, User } from "lucide-react";

const LeaderboardMonth = () => {
  const { month } = useParams();
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const q = query(collection(db, "leaderboards"), where("month", "==", month));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      // Sort by wagered descending
      data.sort((a, b) => b.wagered - a.wagered);
      setLeaders(data);
    };
    fetchLeaders();
  }, [month]);

  const currencyFormat = (value) => {
    return "$" + Number(value).toLocaleString();
  };

  const prizeFormat = (amount) => {
    return "₹" + Number(amount).toLocaleString();
  };

  const getCardColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-[#916e07]";
      case 2:
        return "bg-[#485f70]";
      case 3:
        return "bg-[#94521d]";
      default:
        return "bg-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f1a] text-white py-12 px-4 md:px-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold mb-2">LEADERBOARD</h1>
        <p className="text-sm opacity-80 mb-2">Leaderboard ended</p>
        <p className="text-2xl font-bold">{`28. ${month}. 2025`}</p>
      </div>

      {/* Top 3 Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16">
        {[1, 2, 3].map((rank) => {
          const user = leaders[rank - 1];
          return user ? (
            <div
              key={rank}
              className={`rounded-xl shadow-lg w-80 h-72 flex flex-col justify-center items-center ${getCardColor(
                rank
              )} relative`}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0d0f1a] rounded-full p-3 border-4 border-yellow-400">
                <Crown className="text-yellow-400" size={28} />
              </div>
              <p className="text-center text-sm font-bold mt-8 border border-yellow-400 rounded-full px-4 py-2">
                {user.username}
              </p>
              <p className="mt-4 opacity-60">Wagered</p>
              <p className="text-xl font-semibold">{currencyFormat(user.wagered)}</p>
              <p className="text-yellow-400 mt-4 font-bold">{prizeFormat(user.prize)}</p>
            </div>
          ) : null;
        })}
      </div>

      {/* Other Leaders */}
      <div className="mt-12">
        <h2 className="text-center text-2xl font-bold mb-6">Other Leaders</h2>
        <div className="max-w-5xl mx-auto bg-[#121420] rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-3 text-sm text-gray-400 border-b border-gray-700">
            <div className="col-span-5">Users</div>
            <div className="col-span-4">Wagered</div>
            <div className="col-span-3">Prize</div>
          </div>
          {leaders.slice(3, 10).map((user, index) => (
            <div
              key={user.username}
              className="grid grid-cols-12 items-center px-6 py-3 border-b border-gray-800 hover:bg-[#1a1d2e]"
            >
              <div className="col-span-5 flex items-center gap-2">
                <div className="w-6 h-6 bg-[#1a1d2e] text-white rounded-full flex items-center justify-center text-sm">
                  {index + 4}
                </div>
                <User className="w-4 h-4 text-white" />
                <span className="ml-2">{user.username}</span>
              </div>
              <div className="col-span-4">{currencyFormat(user.wagered)}</div>
              <div className="col-span-3 text-yellow-400">{prizeFormat(user.prize)}</div>
            </div>
          ))}
        </div>
        {leaders.length > 10 && (
          <div className="flex justify-center mt-6">
            <button className="bg-[#1a1d2e] text-white border border-gray-600 px-6 py-2 rounded-full hover:bg-gray-700">
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardMonth;
