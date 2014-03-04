student-recmmndr
================

student-recmmndr

switched the default algorithms to meet my needs:

```javascript
  curl  -X POST http://api.rcmmndr.com/api_key/{API_KEY}/_settings -H "Content-Type:application/json" -d '
﻿ {
    "recommender": {
      "impl": "GenericBooleanPrefUserBasedRecommender",
      "params": {
        "UserSimilarity": {
          "impl": "LogLikelihoodSimilarity"
        },  
        "UserNeighborhood": {
          "impl": "NearestNUserNeighborhood",
          "params": {
            "n": 20
          }
        }
      }
    }
  }'
```
