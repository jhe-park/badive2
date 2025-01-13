"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Pagination,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import CellWrapper from "./cell-wrapper";

export default function ProgramTable(props) {
  return (
    <div className="w-full flex-col justify-center items-center space-y-5">
      <Card className="w-full w-full p-2" {...props}>
        <CardHeader className="flex flex-col items-start px-4 pb-0 pt-4">
          <p className="text-large">Security Settings</p>
          <p className="text-small text-default-500">
            Manage your security preferences
          </p>
        </CardHeader>
        <CardBody className="space-y-2">
          {/* Email */}
          <CellWrapper>
            <div>
              <p>Email Address</p>
              <p className="text-small text-default-500">
                The email address associated with your account.
              </p>
            </div>
            <div className="flex w-full flex-wrap items-center justify-end gap-6 sm:w-auto sm:flex-nowrap">
              <div className="flex flex-col items-end">
                <p>john.doe@mail.com</p>
                <p className="text-small text-success">Verified</p>
              </div>
              <Button
                endContent={<Icon icon="solar:pen-2-linear" />}
                radius="full"
                variant="bordered"
              >
                Edit
              </Button>
            </div>
          </CellWrapper>
          {/* Password */}
          <CellWrapper>
            <div>
              <p>Password</p>
              <p className="text-small text-default-500">
                Set a unique password to protect your account.
              </p>
            </div>
            <Button radius="full" variant="bordered">
              Change
            </Button>
          </CellWrapper>
          {/* Two-Factor Authentication */}

          {/* Deactivate Account */}
          <CellWrapper>
            <div>
              <p>Deactivate Account</p>
              <p className="text-small text-default-500">
                Deactivate your account and delete all your data.
              </p>
            </div>
            <Button radius="full" variant="bordered">
              Deactivate
            </Button>
          </CellWrapper>
          {/* Delete Account */}
          <CellWrapper>
            <div>
              <p>Delete Account</p>
              <p className="text-small text-default-500">
                Delete your account and all your data.
              </p>
            </div>
            <Button color="danger" radius="full" variant="flat">
              Delete
            </Button>
          </CellWrapper>
        </CardBody>
      </Card>
      <div className="w-full flex justify-center items-center">
        <Pagination initialPage={1} total={10} />
      </div>
    </div>
  );
}
