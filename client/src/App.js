import React, { useState, useEffect, useCallback } from "react";
import { useQueryParam, NumberParam, withDefault } from "use-query-params";

import { SecondaryButton } from "./components/Button";
import AddSubscriberModal from "./components/AddSubscriberModal";
import SubscriberStatusModal from "./components/SubscriberStatusModal";
import SubscriberTable from "./components/SubscriberTable";
import TablePagination from "./components/TablePagination";
import LoadingSpinner from "./components/LoadingSpinner";

// Services
import { getSubscribers } from "./services/subscriber";

// Styles
import "./App.css";
import { PrimaryButton } from "./components/Button/Button";

function App() {
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));
  const [perPage, setPerPage] = useQueryParam(
    "perPage",
    withDefault(NumberParam, 25)
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [focusedSubscriberId, setFocusedSubscriberId] = useState("");
  const [focusedSubscriberStatus, setFocusedSubscriberStatus] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const refreshSubscribers = useCallback(() => {
    const params = {
      page,
      per_page: perPage,
    };

    setIsLoading(true);
    getSubscribers(params)
      .then((payload) => {
        const subscribers = payload?.data?.subscribers || [];
        const pagination = payload?.data?.pagination || {};

        setSubscribers(subscribers);
        setPagination(pagination);
      })
      .catch((payload) => {
        const error =
          payload?.response?.data?.message || "Something went wrong";
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, perPage]);

  useEffect(() => {
    refreshSubscribers();
  }, [refreshSubscribers]);

  const onPageSelected = (page) => {
    setPage(page);
  };

  const resetModal = () => {
    setFocusedSubscriberId("");
    setFocusedSubscriberStatus(false);
  };

  const handleAddSubscriberModal = () => {
    setShowAddModal(!showAddModal);
    resetModal();
  };

  const onSuccessAddSubscriber = ({ subscriber, message, pagination }) => {
    console.log(message);

    setSubscribers([...subscribers, subscriber]);
    setPagination(pagination);

    handleAddSubscriberModal();
  };

  const onUpdateStatusSelectected = (subscriberId, status) => {
    setFocusedSubscriberId(subscriberId);
    setFocusedSubscriberStatus(status);
  };

  const onSuccessUpdateStatusSubscriber = ({ subscribers, message }) => {
    console.log(message);

    setSubscribers(subscribers);
    resetModal();
  };

  const handlePaginationButton = () => {
    setPerPage(perPage === 25 ? 10 : 25);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <AddSubscriberModal
          isOpen={showAddModal}
          onClose={handleAddSubscriberModal}
          onSuccess={onSuccessAddSubscriber}
        />
        <SubscriberStatusModal
          isOpen={focusedSubscriberId !== "" && focusedSubscriberStatus !== ""}
          onClose={resetModal}
          onSuccess={onSuccessUpdateStatusSubscriber}
          subscriberId={focusedSubscriberId}
          status={focusedSubscriberStatus}
        />
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold flex items-center">
            {pagination?.total} Subscribers{" "}
            {isLoading && <LoadingSpinner className="ml-4" />}
          </h1>
          <div className="space-x-2">
            <PrimaryButton onClick={handlePaginationButton}>{`Show ${
              perPage === 25 ? 10 : 25
            } Per Page`}</PrimaryButton>
            <SecondaryButton onClick={handleAddSubscriberModal}>
              Add Subscriber
            </SecondaryButton>
          </div>
        </div>
        <div className="mt-6">
          <SubscriberTable
            subscribers={subscribers}
            onChangeStatusSelected={onUpdateStatusSelectected}
          />
          <TablePagination
            pagination={pagination}
            onPageSelected={onPageSelected}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
