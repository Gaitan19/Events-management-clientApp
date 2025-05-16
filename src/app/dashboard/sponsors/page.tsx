// src/app/dashboard/sponsors/page.tsx
"use client";

import { useEffect, useState } from "react";
import { SponsorService } from "@/services/sponsorService";
import { Sponsor } from "@/types/types";
import { toast } from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import DataTable from "@/components/ui/DataTable";
import SponsorForm from "@/components/sponsors/SponsorForm";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const SponsorsPage = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSponsors = async () => {
    try {
      const response = await SponsorService.getSponsors();
      setSponsors(response.data);
    } catch (error) {
      toast.error("Error fetching sponsors");
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this sponsor?")) {
      try {
        await SponsorService.deleteSponsor(id);
        toast.success("Sponsor deleted successfully");
        fetchSponsors();
      } catch (error) {
        toast.error("Error deleting sponsor");
      }
    }
  };

  const handleSubmit = async (sponsorData: Omit<Sponsor, "id">) => {
    try {
      if (selectedSponsor) {
        await SponsorService.updateSponsor(selectedSponsor.id, sponsorData);
        toast.success("Sponsor updated successfully");
      } else {
        await SponsorService.createSponsor(sponsorData);
        toast.success("Sponsor created successfully");
      }
      setIsModalOpen(false);
      fetchSponsors();
    } catch (error) {
      toast.error("Error saving sponsor");
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Website", accessor: "website" },
    { header: "Contribution Level", accessor: "contributionLevel" },
    {
      header: "Actions",
      accessor: "id",
      render: (id: string, row: Sponsor) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedSponsor(row);
              setIsModalOpen(true);
            }}
            className="flex items-center px-3 py-2 space-x-2 text-blue-600 transition-all duration-200 bg-blue-50 rounded-lg hover:bg-blue-100 hover:scale-105 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-400"
          >
            <PencilIcon className="w-5 h-5 opacity-70 hover:opacity-100" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="flex items-center px-3 py-2 space-x-2 text-red-600 transition-all duration-200 bg-red-50 rounded-lg hover:bg-red-100 hover:scale-105 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400"
          >
            <TrashIcon className="w-5 h-5 opacity-70 hover:opacity-100" />
            <span>Delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">
          Sponsors Management
        </h1>
        <button
          onClick={() => {
            setSelectedSponsor(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create New Sponsor
        </button>
      </div>

      <DataTable
        columns={columns}
        data={sponsors}
        emptyMessage="No sponsors found"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedSponsor ? "Edit Sponsor" : "Create Sponsor"}
      >
        <SponsorForm
          initialData={selectedSponsor}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default SponsorsPage;
