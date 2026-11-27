import type { WorkOrder, Project } from "./types"

// --------------------------------
// COMPONENT PROPS
// --------------------------------
type JobClosureProps = {
  workOrders: WorkOrder[]
  projects: Project[]
  closeWorkOrder: (workOrderId: string) => void
  closeProject: (projectId: string) => void
}

// --------------------------------
// JOB CLOSURE COMPONENT
// --------------------------------
function JobClosure({
  workOrders,
  projects,
  closeWorkOrder,
  closeProject,
}: JobClosureProps) {

  return (
    <div className="job-closure-page">

      <h2>Job Closure</h2>

      <div className="closure-grid">

        {/* WORK ORDER CLOSURE */}
        <div className="closure-panel">

          <h3>Work Order Closure</h3>

          {workOrders.length === 0 ? (
            <p className="closure-empty">
              No Work Orders available.
            </p>
          ) : (
            <div className="closure-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Work Order</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {workOrders.map((workOrder) => (
                    <tr key={workOrder.workOrderId}>
                      <td>{workOrder.workOrderId}</td>

                      <td>{workOrder.progress}%</td>

                      <td>{workOrder.status}</td>

                      <td>
                        {workOrder.status === "Completed" ? (
                          <button
                            onClick={() =>
                              closeWorkOrder(workOrder.workOrderId)
                            }
                          >
                            Close Work Order
                          </button>
                        ) : workOrder.status === "Closed" ? (
                          <span>Closed</span>
                        ) : (
                          <span>Not Ready</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* PROJECT CLOSURE */}
        <div className="closure-panel">

          <h3>Project Closure</h3>

          {projects.length === 0 ? (
            <p className="closure-empty">
              No Projects available.
            </p>
          ) : (
            <div className="closure-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Work Order</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((project) => {

                    // Find the Work Order related to this Project
                    const relatedWorkOrder = workOrders.find(
                      (workOrder) =>
                        workOrder.workOrderId === project.workOrderId
                    )

                    return (
                      <tr key={project.projectId}>
                        <td>{project.projectName}</td>

                        <td>{project.workOrderId}</td>

                        <td>{project.status}</td>

                        <td>
                          {project.status === "Closed" ? (
                            <span>Closed</span>
                          ) : relatedWorkOrder?.status === "Closed" ? (
                            <button
                              onClick={() =>
                                closeProject(project.projectId)
                              }
                            >
                              Close Project
                            </button>
                          ) : (
                            <span>Not Ready</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default JobClosure
