"use client";
import React, { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImage } from "../login/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Spinner from "./Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const AvatarImageProfile = ({ data }: { data: any }) => {
  unstable_noStore();
  const [isLoading, setisLoading] = useState("");
  const userId = data?.user?.id;

  return (
    <div>
      <form className="mb-8 flex flex-col items-center justify-center gap-4 my-10">
        <Suspense fallback={<Skeleton />}>
          <Avatar className="w-96 h-96">
            <AvatarImage
              className="object-cover"
              src={`https://aaxuhmukpnvrngnsqoym.supabase.co/storage/v1/object/public/profile/user/${userId}?${Date.now()}`}
              alt="@shadcn"
            />
            <AvatarFallback>
              <Skeleton className="w-96 h-96 mx-auto rounded-full" />
            </AvatarFallback>
          </Avatar>
          <p>
            Selecciona la foto y presion en{" "}
            <Button variant="ghost">Subir foto</Button>
          </p>

          <Input
            type="file"
            name="file"
            id="file"
            className="border border-gray-300 rounded-md p-2"
          />
          <Button formAction={uploadImage} type="submit" className="mt-2 w-full">
            Subir photo
          </Button>
        </Suspense>
      </form>
    </div>
  );
};

export default AvatarImageProfile;
