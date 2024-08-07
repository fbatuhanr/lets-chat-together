import React, { useEffect } from 'react';
import useFriendRequest, { RequestStatus } from '../hooks/api/useFriendship'
import MessageImg from "../assets/message.png"
import { toast } from 'react-toastify';
import { useDecodedToken } from '../hooks/useDecodedToken';

interface FriendRequestButtonProps {
    targetUserId: string;
}

const FriendRequestButton: React.FC<FriendRequestButtonProps> = ({ targetUserId }) => {

    const decodedToken = useDecodedToken()

    const {
        requestStatusBetweenUsers,
        getRequestStatusBetweenUsers,

        removeFriend,
        sendRequest,
        acceptRequest,
        cancelRequest
    } = useFriendRequest(decodedToken.userId);

    useEffect(() => {
        getRequestStatusBetweenUsers(targetUserId)
    }, []);

    const handleClick = async () => {
        let methodToCall;

        if (requestStatusBetweenUsers?.status === RequestStatus.Pending) {
            methodToCall = () => cancelRequest(targetUserId);
        } else if (requestStatusBetweenUsers?.status === RequestStatus.Accepted) {
            methodToCall = () => removeFriend(targetUserId);
        } else if (requestStatusBetweenUsers?.status === RequestStatus.Rejected || requestStatusBetweenUsers?.status === RequestStatus.None) {
            methodToCall = () => sendRequest(targetUserId);
        } else {
            console.error('Unknown status');
            return;
        }

        try {
            await toast.promise(methodToCall(), {
                pending: 'Request sending...',
                success: { render: ({ data }) => `${data}` },
                error: { render: ({ data }) => `${data}` }
            });
            getRequestStatusBetweenUsers(targetUserId)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAcceptRequest = async () => {

        await toast.promise(acceptRequest(targetUserId), {
            pending: 'Request sending...',
            success: { render: ({ data }) => `${data}` },
            error: { render: ({ data }) => `${data}` }
        });
        getRequestStatusBetweenUsers(targetUserId)
    }

    const getButtonText = () => {

        if (requestStatusBetweenUsers?.status === RequestStatus.Pending) {
            return 'Cancel Request';
        } else if (requestStatusBetweenUsers?.status === RequestStatus.Accepted) {
            return 'Remove Friend';
        } else if (requestStatusBetweenUsers?.status === RequestStatus.Rejected || requestStatusBetweenUsers?.status === RequestStatus.None) {
            return 'Friend Request';
        }
    }

    const getButtonClasses = () => {

        if (requestStatusBetweenUsers?.status === RequestStatus.Pending) {
            return 'bg-yellow-600 text-gray-200';
        } else if (requestStatusBetweenUsers?.status === RequestStatus.Accepted) {
            return 'bg-red-500';
        } else if (requestStatusBetweenUsers?.status === RequestStatus.Rejected || requestStatusBetweenUsers?.status === RequestStatus.None) {
            return 'bg-yellow-400';
        }
    }

    return (
        requestStatusBetweenUsers &&
        <div className="flex justify-around">
            <button
                className={`ps-8 pe-12 py-2 text-xl font-bold rounded-2xl [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-[#211a3c] shadow-md relative ${getButtonClasses()}`}
                onClick={handleClick}>
                {getButtonText()}
                <img src={MessageImg} className="absolute w-16 h-auto -top-4 -right-6" alt="Message Icon" />
            </button>
            {
                (requestStatusBetweenUsers.status === RequestStatus.Pending && !requestStatusBetweenUsers.isSender) &&
                <button
                    className="ps-8 pe-12 py-2 text-xl font-bold rounded-2xl [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-[#211a3c] shadow-md relative bg-green-600 text-white"
                    onClick={handleAcceptRequest}>
                    Accept Request
                    <img src={MessageImg} className="absolute w-16 h-auto -top-4 -right-6" alt="Message Icon" />
                </button>
            }
        </div>
    );
};

export default FriendRequestButton