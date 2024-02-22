// CommentItem.tsx
import React from 'react';
import {Comment, FoundUser} from '@/types/apiTypes';
import {Session} from 'next-auth';
import {CommentActions, CommentEdit} from "@/app/components/CommentSection/CommentActions";
import DOMPurify from 'dompurify';
import Gravatar from "react-gravatar";


interface CommentItemProps {
    comment: Comment;
    userData: FoundUser;
    session: Session | null;
    onEditClick: (commentId: string, content: string) => void;
    onRemoveComment: (commentId: string) => void;
    isEditing: boolean;
    editPostContent: string;
    onCancelEdit: () => void;
    onSaveEdit: () => void;
    onEditContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    editError: string | null;
}

const CommentItem: React.FC<CommentItemProps> = ({
                                                     comment,
                                                     userData,
                                                     session,
                                                     onEditClick,
                                                     onRemoveComment,
                                                     isEditing,
                                                     editPostContent,
                                                     onCancelEdit,
                                                     onSaveEdit,
                                                     onEditContentChange,
                                                     editError,
                                                 }) => (
    <div key={comment.id}>
        <div className="p-3">
            <div className="flex justify-between">
                <div className="flex items-center">
                    {/* Display user profile picture */}
                    <Gravatar email={userData.email ? userData.email : ""} size={25} className="rounded-full mr-2"/>
                    <span className="text-md font-semibold">{userData.username}</span>
                </div>
                <span className="text-sm text-gray-500"> {comment.date}</span>
            </div>
            <div className="flex flex-row justify-between mt-2">
                {!isEditing ? (
                    <>
                        <span
                            className="text-sm text-gray-500"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.content) }}
                        />
                        <CommentActions
                            comment={comment}
                            session={session}
                            onEditClick={() => onEditClick(comment.id, comment.content)}
                            onRemoveComment={() => onRemoveComment(comment.id)}
                        />
                    </>
                ) : (
                    <CommentEdit
                        editPostContent={editPostContent}
                        onCancelEdit={onCancelEdit}
                        onSaveEdit={onSaveEdit}
                        onEditContentChange={onEditContentChange}
                        editError={editError}
                    />
                )}
            </div>
        </div>
    </div>
);

export default CommentItem;
