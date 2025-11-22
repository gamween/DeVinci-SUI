module counter::streaming {
    struct Creator has store {
        creator_address: address,
        username: vector<u8>,
        bio: vector<u8>,
        avatar_url: vector<u8>,
        total_streams: u64
    }
    struct LiveStreaming has store {
        id: u64,
        creator: address,
        started_at: u64,
        ended_at: option<u64>,
        viewers: u64,
        ipfs_cid: vector<u8>
    } 
}

