# Implementation of $W$ with RPA response function

## MPI

```mermaid
graph TB
    world[MPI_COMM_WORLD]
    world --> comm_q1[Communicator q]
    world --> comm_q2[Communicator q]
    subgraph comm1 0
     comm_q1_b1
     comm_q1_b2
     comm_q1_b3
     comm_q1_b4
    end
```

## $Z$:zmel
