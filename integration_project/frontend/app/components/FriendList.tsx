import React, { useEffect, useState } from "react";
import {deleteFriend, getAllFriends} from "@/app/components/api";
import InvitePopup from "@/app/profile/[slug]/InvitePopup";
import Gravatar from "react-gravatar";

const FriendList: React.FC<{ slug: string; session: any; friends: string[] | undefined, refresh: () => void }> = ({ slug, session, friends, refresh }) => {
    const [friendList, setFriendList] = useState<any[]>([]);
    const [hoveredFriend, setHoveredFriend] = useState<string | null>(null);
    const [isInvitePopupOpen, setIsInvitePopupOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                if (friends) {
                    const fetchedFriends = await getAllFriends(friends);
                    setFriendList(fetchedFriends);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }

        fetchData().then((r) => r);
    }, [friends]);

    const openInvitePopup = () => {
        setIsInvitePopupOpen(true);
    }

    const closeInvitePopup = () => {
        setIsInvitePopupOpen(false);
        refresh();
    }

    return (
        <div className="bg-violet-100 rounded-l-3xl pb-2 w-[90%] ml-10">
            <div className="flex flex-col mt-[45%] overflow-y-auto h-[50%]">
                <div className="pt-2 pb-2 bg-violet-100 rounded-3xl mb-3 flex items-center justify-between pl-10">
                    <div></div>
                    <h2 className="text-xl font-bold uppercase text-center ml-6">
                        Friend list
                    </h2>
                    <div className="mr-10">
                        {session?.user?.id === slug && (
                    <button
                        onClick={openInvitePopup}
                        className="bg-blue-500 text-white px-2 rounded-xl pb-0.5"
                    >
                        +
                    </button>
                )}
                    </div>
                </div>
                {friendList.length > 0 ? (
                    <div className="pl-[5%]">
                        {friendList.map((friend) => (
                            <div
                                key={friend.id}
                                className="text-sm flex items-center justify-between w-[70%]"
                                onMouseEnter={() => setHoveredFriend(friend.id)}
                                onMouseLeave={() => setHoveredFriend(null)}
                            >
                                <div className="flex">
                                    <div className="mb flex flex-row mb-5">
                                        <a href={`/profile/${friend.id}`} className="text-black hover:underline flex flex-row">
                                            <Gravatar email={friend?.email} size={40} className="rounded-full mr-3"/>
                                        <p className="w-[75%] font-bold text-lg mt-1">{friend.username}</p>
                                        </a>
                                        {hoveredFriend === friend.id && session?.user?.id === slug && (
                                            <button
                                                className="bg-red-300 ml-5 px-2 h-6 mt-1.5 rounded-md text-xs text-red-800 font-bold"
                                                onClick={() => {
                                                    deleteFriend(friend.id, session).then(() => {
                                                        refresh();
                                                    });
                                                }}
                                            > X </button>
                                        )}

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-sm">No friends just yet</p>
                    </div>
                )}
            </div>

            {isInvitePopupOpen && <InvitePopup onClose={closeInvitePopup} />}
        </div>
    );
}

export default FriendList;
