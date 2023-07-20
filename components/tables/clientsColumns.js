import SideSheet from "../SideSheet";
import ClientForm from "../forms/ClientForm";
import DialogBox from "../utilities/DialogBox";

export default function clientsColumns({ onSubmitHandler, onDeleteHandler }) {
  return [
    {
      id: "Acronym",
      accessorKey: "Acronym",
      header: "Acronym",
    },
    {
      id: "Name",
      accessorKey: "Name",
      header: "Name",
    },
    {
      id: "Email",
      accessorKey: "Email",
      header: "Email",
    },
    {
      id: "Phone",
      accessorKey: "PhoneNo",
      header: "Phone",
    },
    {
      id: "Address",
      accessorKey: "Location",
      header: "Address",
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const client = row.original;
        function deleteClient() {
          onDeleteHandler(client.id);
        }
        return (
          <div className="flex gap-2">
            <SideSheet triggerTitle="Edit" title="Edit task">
              <ClientForm
                method="PATCH"
                client={client}
                onSubmit={onSubmitHandler}
              />
            </SideSheet>
            <DialogBox
              triggerTitle={"Delete"}
              title={"Are you absolutely sure?"}
              description={
                "This action cannot be undone. This will permenently delete this client."
              }
              action={deleteClient}
              actionTitle={"Delete"}
            />
          </div>
        );
      },
    },
  ];
}
