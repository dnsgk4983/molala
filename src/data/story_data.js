// 기존 7일 대본을 게임 데이터 구조로 변환한 파일입니다.
// 엔딩 대사와 쿠키 영상은 별도 페이지에서 관리합니다.
export const story_data = {
    1: [
        {
            "type": "message",
            "sender": "system",
            "text": "해변에서 주운 휴대폰 · 메모장 발견"
        },
        {
            "type": "message",
            "sender": "narration",
            "text": "(분실물인데 화면이 켜져 있다. 메모장 제목이… '코랄기사단장의 의무'?)"
        },
        {
            "type": "message",
            "sender": "system",
            "text": "기사단장의 의무 · 제1조 공주님의 연락에 성실하고 정성껏 답변할 것"
        },
        {
            "type": "message",
            "sender": "system",
            "text": "제2조 공주님의 말씀을 경청하고 그 뜻을 헤아릴 것"
        },
        {
            "type": "message",
            "sender": "system",
            "text": "제3조 공주님의 귀여움을 발견하더라도 지나치게 놀리지 말 것"
        },
        {
            "type": "message",
            "sender": "system",
            "text": "제4조 공주님께서 곤경에 처하셨을 때 가장 먼저 달려올 것"
        },
        {
            "type": "message",
            "sender": "system",
            "text": "제5조 공주님과 함께한 모든 순간을 소중히 간직할 것"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "단자아아앙!!"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "아니 왜 연락이 안 되는 거야!!"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "무슨 일 생긴 거 아니지?"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "답장 좀 해봐아ㅏㅏ"
        },
        {
            "type": "message",
            "sender": "narration",
            "text": "(기사단장? 공주님? 이게 무슨 소리야? 엄청 걱정하는 것 같은데… 일단 답장이라도 해볼까.)"
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "해변을 순찰하고 있었습니다.",
                    "affection": 1,
                    "trust": 0,
                    "reply": "해변? 그래서 답장이 늦었구나!\n…근데 말투 뭐야ㅋㅋㅋ\n단장, 또 장난치는 거야?"
                },
                {
                    "text": "길을 잃었습니다. 구조 요청합니다.",
                    "affection": 1,
                    "trust": 1,
                    "reply": "아니 무슨 구조 요청이야ㅋㅋㅋ\n다친 건 아니지?\n진짜 걱정했잖아!"
                },
                {
                    "text": "죄송합니다. 잠깐 정신이 없어서…",
                    "affection": 0,
                    "trust": 1,
                    "reply": "휴, 무슨 일 난 줄 알았잖아!\n근데 너 오늘 왜 이렇게 공손해?"
                }
            ]
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "아무튼 연락됐으니까 됐어!"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "안 그래도 공주절 준비 때문에 바쁜데 단장까지 없어지면 곤란하거든."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "이제 딱 6일 남았잖아."
        },
        {
            "type": "message",
            "sender": "narration",
            "text": "(공주절? 게다가 이 사람, 내가 진짜 단장이라고 믿는 것 같은데…)"
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "공주절? 공주님 생일인가요?",
                    "affection": 1,
                    "trust": 0,
                    "reply": "아니ㅋㅋㅋ 생일이랑은 좀 다른데!\n원래 코랄단이 나한테 고맙다고 만들어 준 날이야."
                },
                {
                    "text": "공주절에는 무슨 일이 있나요?",
                    "affection": 1,
                    "trust": 1,
                    "reply": "좋은 질문!\n코랄단이랑 서로 고맙다고 말하는 특별한 날이지."
                },
                {
                    "text": "공주님이라니, 진짜 공주였어요?",
                    "affection": 1,
                    "trust": 0,
                    "reply": "ㅔ? 그럼 가짜 공주겠냐고ㅋㅋㅋ\n산호왕국의 공주 모라라입니다만?!"
                }
            ]
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "코랄단은 우리 왕국 주민들이면서 내 방송 보러 오는 사람들이야."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "늘 내 이야기 들어주고 같이 웃어주고, 응원해 주거든."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "근데 나는 코랄단이 더 고맙단 말이지."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "그래서 노래도 준비하고, 의상도 고르고, 이것저것 보여줄 걸 준비하는 거야!"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "그리고 내 티아라 있지?"
        },
        {
            "type": "image",
            "image": "day04_tiara.png",
            "text": "추억의 달빛을 모으는 티아라"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "일 년 동안 코랄단이랑 함께한 추억이 달빛으로 쌓여."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "한번 쌓인 달빛은 없어지지 않아. 오래된 추억도 소중하니까."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "그게 공주절에 가득 차면 딱 하루 동안 육지에서 숨 쉴 수 있어!"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "드디어 코랄단이랑 직접 만날 수 있다고오~"
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "준비한 마음이 잘 전해질 거예요.",
                    "affection": 2,
                    "trust": 1,
                    "reply": "…ㅎㅎ 고마워.\n그런 말 들으니까 더 힘난다!"
                },
                {
                    "text": "저도 그날이 기대되네요.",
                    "affection": 1,
                    "trust": 1,
                    "reply": "그치? 나도 엄청 기대돼!\n꼭 기억해 둬! 1월 10일!"
                },
                {
                    "text": "티아라 달빛은 배터리처럼 충전하나요?",
                    "affection": 1,
                    "trust": 0,
                    "reply": "아니ㅋㅋㅋ 보조배터리 아니거든?!\n추억이 쌓이는 거라니까!"
                }
            ]
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "…근데 단장, 너 오늘 진짜 좀 다르다?"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "뭐, 내일 다시 연락할게. 공주절 준비 도와줘야 해!"
        },
        {
            "type": "message",
            "sender": "narration",
            "text": "(사실대로 말할 기회를 놓쳤다. 내일은 휴대폰 주인을 찾아야지.)"
        },
    ],
    2: [
        {
            "type": "message",
            "sender": "molala",
            "text": "방종했어어어"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "오늘도 열심히 일했다…"
        },
        {
            "type": "message",
            "sender": "narration",
            "text": "(방종? 방송도 하는 건가? 이 휴대폰 주인은 방송을 돕는 기사단장이었나 보다.)"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "단장! 오늘 무슨 게임 했는지 맞혀봐!"
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "마인크래프트 같은 힐링 게임!",
                    "affection": 2,
                    "trust": 1,
                    "reply": "정답!! 오늘은 마크 했어!\n힐링은… 건축이 안 무너졌을 때 얘기지만ㅋㅋ"
                },
                {
                    "text": "머리 쓰는 추리 게임!",
                    "affection": 1,
                    "trust": 0,
                    "reply": "그것도 좋아하지!\n근데 오늘은 마크 했어ㅋㅋ"
                },
                {
                    "text": "갑툭튀가 잔뜩 나오는 고어 공포게임!",
                    "affection": 1,
                    "trust": 0,
                    "reply": "아니 왜 하필 그거야아ㅏㅏ!\n오늘은 평화롭게 마크 했거든?!"
                }
            ]
        },
        {
            "type": "image",
            "image": "day02_room.png",
            "text": "모라라의 마인크래프트 서버"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "근데 나 건물 새로 지으려고 하거든."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "단장이라면 뭘 지을 거야?"
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "자동화 설비가 있는 효율적인 기지.",
                    "affection": 1,
                    "trust": 1,
                    "reply": "오, 효율적이네!\n근데 코랄단이랑 같이 꾸밀 공간도 남겨줘야 해."
                },
                {
                    "text": "높이 100블록짜리 모라라 공주 동상.",
                    "affection": 1,
                    "trust": 0,
                    "reply": "아니 왜 하필 내 동상이야아ㅏㅏ!!\n100블록은 너무 크잖아ㅋㅋㅋ"
                },
                {
                    "text": "출구도 힌트도 없는 미로.",
                    "affection": 1,
                    "trust": 0,
                    "reply": "야ㅋㅋㅋㅋ\n코랄단을 영원히 가둬 놓을 셈이야?!"
                }
            ]
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "코랄단도 맨날 이런 식이야."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "나 놀리느라 바쁜데, 내가 뭐 필요하다고 하면 또 우르르 와서 도와주고."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "같이 게임할 때가 제일 재밌어ㅎㅎ"
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "서로 챙겨주는 사람들이네요.",
                    "affection": 2,
                    "trust": 1,
                    "reply": "맞아. 그래서 더 고맙지.\n나도 그 마음에 보답하고 싶어."
                },
                {
                    "text": "공주님이 먼저 잘 챙겨주시니까요.",
                    "affection": 2,
                    "trust": 1,
                    "reply": "ㅔ? 갑자기 칭찬 뭐야!\n…그래도 고마워."
                },
                {
                    "text": "다음엔 200블록 동상으로 갑시다.",
                    "affection": 1,
                    "trust": 0,
                    "reply": "그만 커져ㅋㅋㅋㅋ\n아 진짜 못 말려!"
                }
            ]
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "…근데 단장, 너 원래 이런 거 물어보면 다른 대답 했잖아?"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "오늘은 좀 새롭네? ㅋㅋ"
        },
        {
            "type": "message",
            "sender": "narration",
            "text": "(들킨 걸까? 아니, 지금이라도 말해야 하는데… 이야기가 즐거워서 또 미뤘다.)"
        },
    ],
    3: [
        {
            "type": "message",
            "sender": "molala",
            "text": "단장!! 나 빨리 육지 가고 싶어ㅜㅜ"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "맛있는 것도 먹고 뮤지컬도 보고!"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "그러고 보니 내가 추천해 준 뮤지컬 봤어?"
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "레베카 봤어요!",
                    "affection": 1,
                    "trust": 1,
                    "reply": "오오 레베카!\n어떤 장면이 제일 기억에 남았어?"
                },
                {
                    "text": "스위니 토드 봤어요!",
                    "affection": 1,
                    "trust": 1,
                    "reply": "오? 취향 좀 아는데?ㅋㅋ\n나중에 감상 얘기하자!"
                },
                {
                    "text": "아직 못 봤어요. 같이 보러 갈래요?",
                    "affection": 2,
                    "trust": 1,
                    "reply": "ㅔ? 나랑?\n아니 뭐… 공주절에 시간이 맞으면 볼 수도 있겠지!\n근데 예매는 해야 하잖아!!"
                }
            ]
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "아 맞다, 단장 밥은 잘 챙겨 먹었어?"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "바쁘다고 끼니 거르면 안 돼. 알겠지?"
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "초밥 먹었어요!",
                    "affection": 1,
                    "trust": 1,
                    "reply": "초밥 좋지!\n아 얘기하니까 배고파졌어…"
                },
                {
                    "text": "매운 떡볶이 먹었어요!",
                    "affection": 1,
                    "trust": 1,
                    "reply": "헉 매운 거!\n물도 꼭 마셔ㅋㅋ"
                },
                {
                    "text": "말랑한 복숭아랑 샤인머스캣!",
                    "affection": 1,
                    "trust": 1,
                    "reply": "과일 맛있겠다!\n근데 밥도 챙겨 먹어야지!"
                }
            ]
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "나도 오늘 맛있는 거 먹었거든!"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "사진 보여줄게ㅎㅎ"
        },
        {
            "type": "image",
            "image": "day03_selfie.png",
            "text": "음식과 함께 찍은 모라라의 셀카"
        },
        {
            "type": "message",
            "sender": "narration",
            "text": "(아, 이 사람이 모라라 공주님이구나. 사진을 보고 나니 괜히 말이 조심스러워진다.)"
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "…예쁘네요.",
                    "affection": 2,
                    "trust": 1,
                    "reply": "ㅔ?\n갑자기 뭐야?!\n아니… 고맙긴 한데!! 왜 그렇게 갑자기 말하는데에ㅔㅔ"
                },
                {
                    "text": "음식도 맛있어 보이고, 사진도 잘 나왔네요.",
                    "affection": 2,
                    "trust": 1,
                    "reply": "ㅎㅎ 그치?\n…잠깐, 사진도? 고마워."
                },
                {
                    "text": "사진 속 찻잔은 어디서 구했어요?",
                    "affection": 1,
                    "trust": 0,
                    "reply": "아니 찻잔부터 보냐고ㅋㅋ\n예쁘긴 하지!"
                }
            ]
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "아 맞다, 단장도 바다 사진 좀 보내줘!"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "육지에서 보는 바다는 어떤지 궁금해."
        },
        {
            "type": "message",
            "sender": "narration",
            "text": "(지금 서 있는 해변을 찍어 보내면 되겠지. 그런데 원래 기사단장은 사진을 어떻게 찍었을까?)"
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "달빛이 비치는 바다를 찍어 보낼게요.",
                    "affection": 2,
                    "trust": 1,
                    "reply": "우와아… 달빛이 물 위에 비치는 거 예쁘다.\n나도 얼른 직접 보고 싶어."
                },
                {
                    "text": "파도가 가까이 보이는 사진을 보낼게요.",
                    "affection": 1,
                    "trust": 1,
                    "reply": "오오! 파도 진짜 가까워!\n나중에 직접 보면 어떤 느낌일까?"
                },
                {
                    "text": "갈매기부터 찍어 보낼게요.",
                    "affection": 1,
                    "trust": 0,
                    "reply": "아니ㅋㅋㅋ 바다보다 갈매기가 더 크게 나왔잖아!\n그래도 귀엽네."
                }
            ]
        },
        {
            "type": "image",
            "image": "day03_beach.png",
            "text": "플레이어가 전송한 해변 사진"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "…근데 단장."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "너 원래 사진 이런 식으로 찍었나?"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "ㅋㅋㅋ 아무튼 예쁘네."
        },
        {
            "type": "message",
            "sender": "narration",
            "text": "(이제 와서 기사단장이 아니라고 말해야 하나… 그런데 조금만 더 이야기하고 싶다.)"
        },
    ],
    4: [
        {
            "type": "message",
            "sender": "molala",
            "text": "단장 뭐 해?"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "나 오늘 공주절 준비하다가 엄청 옛날 기록 발견했어ㅋㅋㅋ"
        },
        {
            "type": "image",
            "image": "day04_scrapbook.png",
            "text": "오래된 방송 기록과 코랄기사단 자료"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "우리 코랄기사단 처음 만들었을 때 기억나?"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "처음 누가 나를 '공주님'이라고 불러 줬을 때 진짜 신기했는데ㅋㅋ"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "그때는 이렇게 코랄단이 많아질 줄 몰랐어."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "아 맞다. 너 그때 기사단의 맹세 했던 거 기억해?"
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "공주님의 명령은 절대복종!",
                    "affection": 1,
                    "trust": 0,
                    "reply": "ㅋㅋㅋㅋ 아니 그건 아니고!\n너 그때 무슨 일이 있어도 내 이야기를 들어주겠다고 했잖아."
                },
                {
                    "text": "공주님을 언제나 지켜드리겠습니다!",
                    "affection": 1,
                    "trust": 1,
                    "reply": "그것도 멋있긴 한데ㅋㅋ\n내가 기억하는 건, 내 이야기를 끝까지 들어주겠다는 말이야."
                },
                {
                    "text": "사실… 잘 기억이 안 나요.",
                    "affection": 0,
                    "trust": 1,
                    "reply": "…그래?\n그때 네가 무슨 일이 있어도 내 이야기를 들어주겠다고 했어.\n그 말이 참 오래 남더라."
                }
            ]
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "지금도 옛날 채팅 기록 보면 그때 했던 장난이 생각나ㅋㅋ"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "처음엔 아무도 나를 몰랐는데, 지금은 매일 와서 같이 웃어주고 내 노래도 들어주고."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "내가 좋아하는 사람들이랑 보낸 시간은 다 기억하고 싶거든."
        },
        {
            "type": "image",
            "image": "day04_tiara.png",
            "text": "추억의 달빛이 쌓이는 티아라"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "그래서 티아라에 달빛이 쌓이는 건가 봐."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "함께한 시간은 다 여기 남아 있는 거니까."
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "앞으로도 많은 추억이 쌓이겠네요.",
                    "affection": 2,
                    "trust": 2,
                    "reply": "ㅎㅎ 그치.\n앞으로도 더 재밌는 일 많이 만들고 싶어."
                },
                {
                    "text": "공주님을 좋아하는 사람이 참 많네요.",
                    "affection": 2,
                    "trust": 1,
                    "reply": "응. 정말 고마운 사람들이야.\n나도 그만큼 마음을 전하고 싶어."
                },
                {
                    "text": "그럼 저도 그 추억 속에 있는 건가요?",
                    "affection": 2,
                    "trust": 2,
                    "reply": "…ㅎㅎ\n지금 이렇게 얘기하고 있잖아. 당연하지."
                }
            ]
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "나 혼자서는 못 만드는 추억들이잖아."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "공주절은 내가 코랄단을 좋아하는 만큼, 그 마음을 전할 수 있는 날이니까."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "…근데 있잖아. 너는 예전 일을 좀 다르게 기억하는 것 같아."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "괜찮아. 지금 나누는 이야기도 나는 좋아."
        },
        {
            "type": "message",
            "sender": "narration",
            "text": "(분명 원래 기사단장과 코랄단의 이야기일 텐데… 이상하게 나도 그 이야기에 함께하고 싶어졌다.)"
        },
    ],
    5: [
        {
            "type": "message",
            "sender": "system",
            "text": "늦은 밤 · 노래 방송 종료"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "단장아아"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "나 방금 노래 방송 끝났어."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "오늘은 좀 늦게까지 했네ㅋㅋ"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "그러고 보니 단장은 어떤 노래 좋아해?"
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "보컬로이드 노래!",
                    "affection": 1,
                    "trust": 1,
                    "reply": "오오~ 좋지!\n멜로디가 오래 남는 곡도 많잖아."
                },
                {
                    "text": "신나는 록 음악!",
                    "affection": 1,
                    "trust": 1,
                    "reply": "오! 신나는 거 좋지ㅋㅋ\n무대에서 부르면 엄청 재밌겠다."
                },
                {
                    "text": "감성적인 발라드!",
                    "affection": 1,
                    "trust": 1,
                    "reply": "그런 날도 있지.\n오늘은 그런 마음으로 들어줬으면 하는 노래가 있어."
                }
            ]
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "사실 이번 공주절에 들려주고 싶은 노래가 있거든."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "내 오리지널 곡인데, 제목은 '백일몽'이야."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "그냥… 코랄단 생각하면서 들어줬으면 좋겠어."
        },
        {
            "type": "image",
            "image": "day05_singing.png",
            "text": "달빛 아래에서 노래하는 모라라"
        },
        {
            "type": "music",
            "title": "백일몽",
            "text": ""
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "…어때?"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "소감 좀 말해봐."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "나 이거 진짜 열심히 준비했단 말이야."
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "오래전의 추억이 그리워지는 노래 같아요.",
                    "affection": 1,
                    "trust": 1,
                    "reply": "응. 가끔 옛날 채팅을 보면 그때가 떠올라.\n그때 웃었던 것도 다 소중하거든."
                },
                {
                    "text": "함께했던 시간을 소중하게 간직하고 싶은 마음이 느껴져요.",
                    "affection": 3,
                    "trust": 2,
                    "reply": "…응. 내가 전하고 싶었던 마음이야.\n그렇게 들어줘서 고마워."
                },
                {
                    "text": "앞으로도 좋은 추억을 많이 만들 수 있을 것 같아요.",
                    "affection": 3,
                    "trust": 2,
                    "reply": "맞아!\n앞으로 어떤 사람들을 만나게 될지도 기대돼."
                }
            ]
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "방송하다 보면 정말 많은 사람을 만나잖아."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "매일 함께 웃던 시간이 나중에는 추억이 되기도 하고."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "옛날 채팅 보면 내가 했던 말도, 코랄단이 했던 장난도 생각나ㅋㅋ"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "그래서 그런 순간들을 오래 기억하고 싶어."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "그렇다고 새로운 날이 기대되지 않는 건 아니야."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "너랑 이렇게 새로운 이야기를 하고 있는 것처럼ㅎㅎ"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "…아 뭐야ㅋㅋㅋ 또 갑자기 진지해졌네."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "아무튼! 오늘도 내 노래 들어줘서 고마워."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "그리고 요즘 이렇게 답장해 주는 사람이 있어서 좋아."
        },
        {
            "type": "message",
            "sender": "narration",
            "text": "(그 말은 원래 기사단장에게 하는 걸까? 아니면 지금 대화하는 나에게?)"
        },
    ],
    6: [
        {
            "type": "message",
            "sender": "molala",
            "text": "단장. 큰일 났어."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "나 내일이 공주절이야."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "아니 그건 당연한 건데ㅋㅋㅋ 준비할 게 왜 이렇게 많지?!"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "노래 마지막 확인도 해야 하고, 의상도 봐야 하고…"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "코랄단한테 보여줄 이벤트도 정리해야 하는데!!"
        },
        {
            "type": "image",
            "image": "day06_outfit.png",
            "text": "모라라가 준비한 공주절 의상"
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "중요한 것부터 하나씩 정리해 봐요.",
                    "affection": 2,
                    "trust": 2,
                    "reply": "…맞아. 내가 너무 한꺼번에 생각했나 봐.\n좋아. 하나씩 확인하자!"
                },
                {
                    "text": "뭘 해도 코랄단은 좋아할 거예요!",
                    "affection": 2,
                    "trust": 1,
                    "reply": "ㅎㅎ 고마워.\n그래도 이왕 하는 거 잘하고 싶단 말이야."
                },
                {
                    "text": "공주님이라면 당연히 완벽해야죠!",
                    "affection": 1,
                    "trust": 0,
                    "reply": "아아아 그 부담 주지 마ㅋㅋㅋ\n그래도 잘하고 싶은 건 맞아!"
                }
            ]
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "일 년에 딱 한 번뿐인 날인데!"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "코랄단은 맨날 나한테 마음을 표현해 주잖아."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "편지도 써주고, 그림도 그려주고, 방송에 와서 같이 웃어주고."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "근데 나는 가끔 그만큼 돌려주고 있나 싶거든."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "그래서 공주절에는 진짜 잘해주고 싶어."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "내가 얼마나 고마워하는지 알려주고 싶어서."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "…아 뭐야ㅋㅋㅋ 왜 이렇게 진지해졌지?!"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "아무튼 이번 공주절은 기대해도 좋아!"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "티아라도 거의 다 찼어. 내일이면 드디어 육지에 나갈 수 있거든."
        },
        {
            "type": "image",
            "image": "day06_invitation.png",
            "text": "공주절 초대장"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "그러니까… 단장, 내일 해변에서 기다려줄 거지?"
        },
        {
            "type": "choice",
            "options": [
                {
                    "text": "꼭 기다릴게요. 준비한 하루를 직접 보고 싶어요.",
                    "affection": 3,
                    "trust": 2,
                    "reply": "…ㅎㅎ 알았어.\n나도 내일 열심히 해볼게!"
                },
                {
                    "text": "내일 상황을 보고 갈 수 있으면 갈게요.",
                    "affection": 0,
                    "trust": 0,
                    "reply": "응. 무리하진 말고.\n그래도 오면 좋겠다."
                },
                {
                    "text": "다른 코랄단도 많이 기다리고 있을 거예요.",
                    "affection": 1,
                    "trust": 0,
                    "reply": "그치. 다들 만나고 싶어.\n…그리고 너도."
                }
            ]
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "아, 그리고… 내일 만나면 꼭 하고 싶은 말이 있어."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "그러니까 기대해도 좋아! 잘 자아~"
        },
        {
            "type": "message",
            "sender": "narration",
            "text": "(내일이면 진짜 만나게 되는구나. 그때는 사실대로 말해야겠지.)"
        },
    ],
    7: [
        {
            "type": "message",
            "sender": "system",
            "text": "1월 10일 · 공주절"
        },
        {
            "type": "image",
            "image": "day07_festival.png",
            "text": "모라라와 코랄단이 함께 완성한 공주절"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "단장!! 드디어 공주절이야아아!!"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "준비한 노래도, 의상도, 이벤트도 다들 엄청 좋아해 줬어ㅎㅎ"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "티아라도 달빛이 가득 찼고!"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "나 이제 육지에서 숨 쉴 수 있어!"
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "지금 처음 이야기했던 그 해변으로 가고 있어."
        },
        {
            "type": "message",
            "sender": "molala",
            "text": "조금만 기다려줘!"
        },
        {
            "type": "message",
            "sender": "narration",
            "text": "(공주절은 성공했다. 모라라는 코랄단에게 마음을 전했고, 코랄단도 그 마음에 답했다.)"
        },
        {
            "type": "message",
            "sender": "narration",
            "text": "(하지만 나는 진짜 기사단장이 아니다. 이 휴대폰을 주운 날부터 지금까지…)"
        },
        {
            "type": "message",
            "sender": "narration",
            "text": "(이제는 내가 누구인지, 어떤 마음으로 답장했는지 말해야 한다.)"
        },
    ],
};

export const last_day = Object.keys(story_data).length;
