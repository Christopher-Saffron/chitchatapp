import useOtherUser from "@/hooks/useOtherUser";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import React, { Fragment, useMemo, useState } from "react";
import Avatar from "../Avatar";
import Modal from "../Modal";

interface ProfileDrawerProps {
  data: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  onClose: () => void;
}

function ProfileDrawer({ data, onClose, isOpen }: ProfileDrawerProps) {
  const otherUser = useOtherUser(data);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [otherUser.name, data.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return "Active";
  }, [data]);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(true)}>
        <div className="bg-white p-5">
          <p>HELLO MODAL</p>
        </div>
      </Modal>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg--opacity-40"></div>
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointers-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                            >
                              <span
                                className=" text-black cursor-pointer "
                                onClick={onClose}
                              >
                                Close panel
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 text-black ">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            <Avatar user={otherUser} />
                          </div>
                          <div>{title}</div>
                          <div>{statusText}</div>
                          {!data.isGroup && (
                            <>
                              <div>
                                <div>email</div>
                                <p>{otherUser.email}</p>
                                <div>joined</div>
                                <time dateTime={joinedDate}>{joinedDate}</time>
                              </div>
                            </>
                          )}
                          <div
                            onClick={() => setIsModalOpen(true)}
                            className="border p-3 border-sky-500 cursor-pointer"
                          >
                            DELETE (TRASH ICON)
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default ProfileDrawer;
