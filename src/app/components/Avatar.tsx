import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { uploadImage } from "../login/actions";

const Avatar = ({ data }: { data: any }) => {
  const userId = data?.user?.id;
  return (
    <div>
      <form className="mb-8 flex flex-col items-center justify-center gap-4">
        <Input placeholder="Upload a photo" type="file" name="file" id="file" />
        <Button formAction={uploadImage} type="submit" className="mt-2">
          Submit photo
        </Button>
        <Image
          src={`https://aaxuhmukpnvrngnsqoym.supabase.co/storage/v1/object/public/profile/user/${userId}?${Date.now()}`}
          width={400}
          height={400}
          alt="user-avatar"
        />
      </form>
    </div>
  );
};

export default Avatar;
