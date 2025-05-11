package com.companydating.repository;

import com.companydating.model.Match;
import com.companydating.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findByUser1OrUser2(User user1, User user2);
    List<Match> findByUser1AndStatus(User user1, Match.MatchStatus status);
    List<Match> findByUser2AndStatus(User user2, Match.MatchStatus status);
    Optional<Match> findByUser1AndUser2(User user1, User user2);
} 