"use client";

import React, { useState, useEffect } from "react";
import { createCollection } from "@/actions/collection";
import { toast } from "sonner";
import CollectionPreview from "./collection-preview";
import useFetch from "@/hooks/use-fetch";
import CollectionForm from "@/components/collection-dialog";

const Collections = ({
  collections = [],
  entriesByCollection, 
  fetchCollections, // ✅ Added this prop for re-fetching after creation
}) => {
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);

  const {
    loading: createCollectionLoading,
    fn: handleCreateCollection,
    data: createdCollection,
  } = useFetch(createCollection);

  useEffect(() => {
    if (createdCollection) {
      setIsCollectionDialogOpen(false);
      fetchCollections?.(); // ✅ Safely call if passed
      toast.success(`Collection "${createdCollection.name}" created!`);
    }
  }, [createdCollection, createCollectionLoading, fetchCollections]);

  const handleOpenCreateDialog = () => {
    setIsCollectionDialogOpen(true);
  };

  if (collections.length === 0 && !entriesByCollection?.unorganized?.length) {
    return (
      <section className="text-center py-10 space-y-4 text-muted-foreground">
        <p>No collections found.</p>
        <button
          className="px-4 py-2 text-sm font-medium bg-primary text-white rounded"
          onClick={handleOpenCreateDialog}
        >
          Create Your First Collection
        </button>

        <CollectionForm
          loading={createCollectionLoading}
          onSuccess={handleCreateCollection}
          open={isCollectionDialogOpen}
          setOpen={setIsCollectionDialogOpen}
        />
      </section>
    );
  }

  return (
    <section id="collections" className="space-y-6">
      <h2 className="text-3xl font-bold gradient-title">Collections</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Create New Collection */}
        <CollectionPreview isCreateNew onCreateNew={handleOpenCreateDialog} />

        {/* Unorganized Collection */}
        {entriesByCollection?.unorganized?.length > 0 && (
          <CollectionPreview
            name="Unorganized"
            entries={entriesByCollection.unorganized}
            isUnorganized
          />
        )}

        {/* User Collections */}
        {collections.map((collection) => (
          <CollectionPreview
            key={collection.id}
            id={collection.id}
            name={collection.name}
            entries={entriesByCollection?.[collection.id] || []}
          />
        ))}
      </div>

      <CollectionForm
        loading={createCollectionLoading}
        onSuccess={handleCreateCollection}
        open={isCollectionDialogOpen}
        setOpen={setIsCollectionDialogOpen}
      />
    </section>
  );
};

export default Collections;
