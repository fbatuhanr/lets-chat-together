export interface UserProps {
    _id: string;
    username: string;
    name: string;
    surname: string;
    gender: 'male' | 'female' | 'other';
    dateOfBirth?: Date;
    profilePhoto?: File | FileList | string | null;
    about?: string | null;
}
export interface FriendProps {
  _id: string;
  username: string;
  profilePhoto?: string | null;
}