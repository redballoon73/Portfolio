#openai 클라이언트를 가져오는 코드
from dotenv import load_dotenv
import os
from openai import OpenAI
client = OpenAI()

load_dotenv()
API_KEY = os.environ['OPENAI_API_KEY']

client = OpenAI(api_key=API_KEY)

#STEP 1
#assistant 만들기
#어시스턴트의 주민등록 번호 id
#어시스턴트의 id='asst_FzZxIS8YpQuP1X4xjVPZb58R'
# assistant = client.beta.assistants.create(
#     name="Predictor",
#     instructions="Your role is to analyze and explain the causes of depression by region and age in South Korea and propose policies to address depression.",
#     tools=[{"type": "retrieval"}],
#     model="gpt-4-turbo-preview"
# )
# print(assistant)

#STEP 2
#thread를 특정하는 주민번호. 대화 창을 구별하는 번호.
#thread의 id : thread_9OJVNATJbDVSkN0GC1NuIgny
# thread = client.beta.threads.create()
# print(thread)

# STEP 3
#message의 id : msg_Ewt8HXZHVUf9EUzTvNTd8mLn
# message = client.beta.threads.messages.create(
#     thread_id="thread_9OJVNATJbDVSkN0GC1NuIgny",
#     role="user",
#     content="대한민국의 각 지역별, 연령별로 우울증의 원인을 분석해주고, 해결방안을 제시해줘"
# )
# print(message)

#STEP 4
#run의 id : run_gTDNw4qv7HVmSd2Fzqt589SX
#status='queued'가 아니라 'completed'가 되어야 run이 끝남
# run = client.beta.threads.runs.create(
#   thread_id="thread_9OJVNATJbDVSkN0GC1NuIgny",
#   assistant_id="asst_FzZxIS8YpQuP1X4xjVPZb58R",
#   instructions="Please address the user as Jane Doe. The user has a premium account."
# )
# print(run)

#STEP 5 run이 끝났는지 안 끝났는지 확인 -> status = 'comleted'
# run = client.beta.threads.runs.retrieve(
#   thread_id="thread_9OJVNATJbDVSkN0GC1NuIgny",
#   run_id="run_gTDNw4qv7HVmSd2Fzqt589SX"
# )
# print(run)

#STEP 6 결과 메세지 불러오기, 모든 메세지를 다 불러오기

messages = client.beta.threads.messages.list(
  thread_id="thread_9OJVNATJbDVSkN0GC1NuIgny"
)
print(messages.data[0].content[0].text.value)