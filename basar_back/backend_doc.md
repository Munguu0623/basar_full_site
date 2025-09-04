# BASAR – Backend Кодын Стандарт (Java Spring Boot) ба AI Prompt Guide (v1.0)

> **Товч:** BASAR backend-ийг **Java 17 + Spring Boot 3** дээр хөгжүүлэх стандарт. Архитектур, фолдерын бүтэц, аюулгүй байдал (JWT/RBAC), баталгаажуулалт, логжилт, гүйцэтгэл, тест, CI/CD, OpenAPI, мөн AI (Cursor/Claude/Copilot)‑д өгөх **Prompt Template**-үүд.

---

## 0) Гол зарчим
- **Scope сахих:** Story/Task-аас гадуур код **өөрчлөхийг хориглоно**. Шаардлагатай бол Issue/PR comment → **тусдаа PR**.
- **Type-safe first:** null‑аас зайлсхий; Optional/@NotNull/Validated ашигла.
- **Validation everywhere:** **Jakarta Bean Validation** (JSR-380) бүх оролтод.
- **Security by default:** Spring Security + JWT(httpOnly cookie), RBAC, rate-limit.
- **Observability:** SLF4J/Logback structured logs + Micrometer metrics.
- **Small PRs:** ≤ 300 LOC, нэг Story = нэг PR.
- **Tests:** Unit + Slice + Integration (Testcontainers) заавал.
- **Docs:** springdoc‑openapi (OpenAPI 3) шинэчилж байлга.

---

## 1) Технологийн сонголт
- **Java 17**, **Spring Boot 3.x**
- Spring Web, Spring Security, Spring Data JPA (Hibernate)
- **PostgreSQL**, **Flyway** (миграци)
- **JWT** (jjwt/io.jsonwebtoken) – httpOnly cookie эсвэл Authorization: Bearer
- **Bean Validation** (`jakarta.validation`), **MapStruct** (DTO mapper), **Lombok**
- **Bucket4j** (rate limiting filter)
- **Micrometer + Prometheus**, **springdoc-openapi**
- Build: Gradle (эсвэл Maven)
- Тест: **JUnit5**, **Spring Boot Test**, **MockMvc/RestAssured**, **Testcontainers**

Gradle dependencies (жишээ):
```kotlin
dependencies {
  implementation("org.springframework.boot:spring-boot-starter-web")
  implementation("org.springframework.boot:spring-boot-starter-security")
  implementation("org.springframework.boot:spring-boot-starter-validation")
  implementation("org.springframework.boot:spring-boot-starter-data-jpa")
  implementation("org.flywaydb:flyway-core")
  implementation("org.postgresql:postgresql")
  implementation("io.jsonwebtoken:jjwt-api:0.11.5")
  runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
  runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5")
  implementation("org.mapstruct:mapstruct:1.5.5.Final")
  annotationProcessor("org.mapstruct:mapstruct-processor:1.5.5.Final")
  compileOnly("org.projectlombok:lombok")
  annotationProcessor("org.projectlombok:lombok")
  implementation("com.github.vladimir-bukhtoyarov:bucket4j-core:8.0.1")
  implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.5.0")
  implementation("io.micrometer:micrometer-registry-prometheus")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testImplementation("org.testcontainers:junit-jupiter")
  testImplementation("org.testcontainers:postgresql")
  testImplementation("io.rest-assured:rest-assured")
}
```

---

## 2) Фолдерын бүтэц (Hexagonal-ish, feature‑driven)
```
basar-backend/
  src/main/java/com/basar
    /config            # Security, CORS, OpenAPI, Jackson, RateLimit
    /common
      /exceptions      # GlobalExceptionHandler, ErrorCodes
      /logging         # RequestIdFilter
      /mapper          # Base mappers (MapStruct)
      /util            # DateUtils, SlugUtils, etc.
    /auth              # AuthController, JwtService, UserDetailsService
    /news              # NewsController/Service/Repo/Entity/DTO
    /blog              # BlogController/Service/Repo/Entity/DTO
    /organization      # OrganizationController/Service/Repo/Entity/DTO
    /search            # SearchController/Service
    /admin             # AdminController/Service
    /notification      # NotificationService, jobs
  src/main/resources
    application.yml
    db/migration       # Flyway V__ миграци файлууд
  src/test/java/...    # Unit + Integration (Testcontainers)
```

**Controller → Service → Repository → Entity/DTO → Mapper** загвар баримтална.  
- Controller: REST API + validation + response codes
- Service: бизнес логик, transaction
- Repository: JPA interface/Query
- DTO: API contract (entity-г шууд бүү гарга)
- Mapper: MapStruct ашиглаж entity⇄dto хөрвүүл

---

## 3) Нэршил, кодын хэв маяг
- Package: `com.basar.<feature>`
- Класс: `PascalCase`, хувьсагч/метод: `camelCase`
- DTO: `NewsListItemDto`, `BlogPostDto`
- Endpoint path: **өндөр түвшинд**, `kebab-case` (`/api/news`, `/api/organizations`)
- **Google Java Format** + **Checkstyle/SpotBugs** CI-д

---

## 4) Entities & DTOs (жишээ – News)
```java
// Entity
@Entity @Table(name="news")
@Getter @Setter
public class News {
  @Id @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(nullable=false, unique=true) private String slug;
  @Column(nullable=false) private String title;
  @Column(columnDefinition="text") private String content;
  private String excerpt;
  private String imageUrl;
  @Column(nullable=false) private String category;
  @Column(nullable=false) private Instant publishedAt = Instant.now();
}

// DTO
public record NewsListItemDto(
  UUID id, String title, String excerpt, String imageUrl, String category, Instant publishedAt
) {}
```

**MapStruct mapper**
```java
@Mapper(componentModel = "spring")
public interface NewsMapper {
  NewsListItemDto toListDto(News n);
  NewsDetailDto toDetailDto(News n);
}
```

---

## 5) Controller давхарга (validation + status)
```java
@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
@Validated
public class NewsController {
  private final NewsService newsService;

  @GetMapping
  public PageResponse<NewsListItemDto> list(
    @RequestParam(defaultValue="1") @Min(1) int page,
    @RequestParam(defaultValue="10") @Min(1) @Max(50) int pageSize,
    @RequestParam(required=false) String category,
    @RequestParam(required=false) String tag
  ) {
    return newsService.list(page, pageSize, category, tag);
  }

  @GetMapping("/{slug}")
  public NewsDetailDto get(@PathVariable String slug) {
    return newsService.getBySlug(slug);
  }
}
```

**Response wrapper**
```java
public record PageResponse<T>(List<T> items, long totalCount) {}
```

---

## 6) Service (transaction, бизнес логик)
```java
@Service @Transactional(readOnly = true)
@RequiredArgsConstructor
public class NewsService {
  private final NewsRepository repo;
  private final NewsMapper mapper;

  public PageResponse<NewsListItemDto> list(int page, int pageSize, String category, String tag) {
    Pageable pageable = PageRequest.of(page-1, pageSize, Sort.by(Sort.Direction.DESC, "publishedAt"));
    Page<News> p = repo.search(category, tag, pageable);
    return new PageResponse<>(p.map(mapper::toListDto).toList(), p.getTotalElements());
  }

  public NewsDetailDto getBySlug(String slug) {
    return repo.findBySlug(slug)
      .map(mapper::toDetailDto)
      .orElseThrow(() -> new NotFoundException("NEWS_NOT_FOUND", "News not found"));
  }
}
```

---

## 7) Repository (JPA)
```java
public interface NewsRepository extends JpaRepository<News, UUID> {
  Optional<News> findBySlug(String slug);

  @Query("""
    select n from News n
    where (:category is null or n.category = :category)
  """)
  Page<News> search(@Param("category") String category,
                    @Param("tag") String tag,
                    Pageable pageable);
}
```

---

## 8) Алдаа барилт (GlobalExceptionHandler)
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<?> handleNotFound(NotFoundException e) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
      .body(Map.of("error", Map.of("code", e.getCode(), "message", e.getMessage())));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<?> handleValidation(MethodArgumentNotValidException e) {
    return ResponseEntity.badRequest()
      .body(Map.of("error", Map.of("code", "INVALID_INPUT", "message", "Validation failed")));
  }
}
```

---

## 9) Security (JWT + RBAC)
- Roles: `ROLE_USER`, `ROLE_ORG`, `ROLE_ADMIN`
- Stateless JWT, **httpOnly** cookie (эсвэл Bearer)
- Endpoint хамгаалалт:
  - `/api/admin/**` → ADMIN
  - `/api/blog/**` (POST/PUT/DELETE) → USER
  - `/api/organizations/apply` → PUBLIC OK

**Security config (жишээ):**
```java
@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
  private final JwtAuthFilter jwtAuthFilter;

  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/admin/**").hasRole("ADMIN")
        .requestMatchers(HttpMethod.POST, "/api/blog/**").hasRole("USER")
        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/healthz").permitAll()
        .anyRequest().permitAll()
      )
      .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }
}
```

---

## 10) Rate limiting (Bucket4j filter)
```java
@Component
public class RateLimitFilter extends OncePerRequestFilter {
  private final Bucket bucket = Bucket4j.builder()
    .addLimit(Bandwidth.simple(20, Duration.ofSeconds(60)))
    .build();
  @Override protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
      throws ServletException, IOException {
    if (req.getRequestURI().startsWith("/api/auth") || req.getRequestURI().contains("/comments")) {
      if (!bucket.tryConsume(1)) { res.setStatus(429); return; }
    }
    chain.doFilter(req, res);
  }
}
```

---

## 11) Логжилт & Метрик
- **SLF4J + Logback** JSON layout (prod)
- `X-Request-Id` filter → MDC-д хадгалж, log бүрт оруул
- **Micrometer** → Prometheus endpoint `/actuator/prometheus`
- Healthcheck: `/actuator/health` + DB ping

---

## 12) Гүйцэтгэл
- JPA fetch size/page, index тохиргоо
- Read‑heavy endpoint-д **@Cacheable** (Redis) хэрэглэх боломжтой
- Pageable ≤ 50; projection ашиглаж lightweight DTO буцаа
- Async job → Spring Scheduling/Quartz

---

## 13) Миграци (Flyway)
- `/src/main/resources/db/migration` – `V1__init.sql`, `V2__news.sql` …
- DDL зөвхөн PR‑аар; downgrade стратеги тодорхой

---

## 14) OpenAPI (springdoc)
- `/swagger-ui/index.html`
- `@Operation`, `@Schema` ашиглаж contract-аа тэмдэглэ

---

## 15) Тест (JUnit5, Testcontainers)
- **Unit**: Service/Mapper (Mockito)
- **Slice**: @WebMvcTest (MockMvc)
- **Integration**: @SpringBootTest + Testcontainers(Postgres)
- **RestAssured** smoke: auth + happy path

---

## 16) CI/CD
- Build → Unit tests → Integration (Testcontainers) → OpenAPI generate → Checkstyle/SpotBugs → Docker build → Flyway migrate → Deploy
- Merge strategy: squash; Release notes-д миграци заавар

---

## 17) Error формат
- **Амжилт:** `{ "items": [...], "totalCount": 123 }` эсвэл DTO
- **Алдаа:** `{ "error": { "code": "INVALID_INPUT", "message": "..." } }`

---

## 18) ENV / Config
application.yml‑д profile‑оор ялга:
```yaml
spring:
  datasource:
    url: ${BASAR_DB_URL}
    username: ${BASAR_DB_USER}
    password: ${BASAR_DB_PASS}
  jpa:
    hibernate:
      ddl-auto: validate
    open-in-view: false
  flyway:
    enabled: true

basar:
  jwt:
    secret: ${BASAR_JWT_SECRET}
    expiration: 86400
management:
  endpoints:
    web:
      exposure:
        include: health,prometheus,info
```

---

## 19) Change Control (“Өмнөх функцийг бүү өөрчил”)
- Story/PR хүрээнээс гадуур class/method **бүү зас**.
- Refactor хэрэгтэй бол Issue → TL зөвшөөрөл → тусдаа PR.
- Public contract (controller signature/DTO) өөрчлөх бол OpenAPI diff + миграци төлөвлөгөө.

---

## 20) AI Prompt Guide (Spring Boot)

### 20.1 Endpoint Prompt
```
Implement [METHOD] /api/[resource] using Spring Boot 3:

Follow docs:
- docs/BASAR_BACKEND_SPRING.md (Sections 2,4,5,8,9,10,14,15,17)
- OpenAPI contract (if exists)

Requirements:
- Controller in com.basar.[feature].[Feature]Controller
- Validate inputs with Bean Validation (@Valid, @Min/@Max/@NotBlank)
- Service + Repository + MapStruct DTO mapper
- Spring Security RBAC (ROLE_USER/ROLE_ADMIN) if needed
- Error format: { error: { code, message } }
- Add tests: @WebMvcTest (MockMvc) + integration (Testcontainers)
- Do NOT modify unrelated files; keep scope limited
Story: [ID]
Acceptance Criteria: [paste]
```

### 20.2 Service/Repository Prompt
```
Create [Feature]Service and [Feature]Repository:

- Repository: JpaRepository<Entity, UUID>, custom @Query if needed
- Service: transactional, business logic only
- Mapper: MapStruct to convert Entity <-> DTO
- Unit tests with Mockito; no external effects
```

### 20.3 Security/RateLimit Prompt
```
Add security for [endpoint]:

- Update SecurityConfig to require ROLE_[X]
- JWT via httpOnly cookie (or Bearer) as per docs
- Add Bucket4j RateLimitFilter for /api/auth and POST /api/blog/*
- Tests: unauthorized=401, forbidden=403, ok=200
```

### 20.4 Global Error Handling Prompt
```
Implement GlobalExceptionHandler (ControllerAdvice):

- Map NotFoundException -> 404
- MethodArgumentNotValidException -> 400 (INVALID_INPUT)
- AccessDeniedException -> 403
- Default -> 500 (INTERNAL)
- Ensure response format is { error: { code, message } }
```

### 20.5 Job/CRON Prompt
```
Implement weekly digest job in notification module:

- @Scheduled(cron="0 0 9 * * MON")
- Query top content from services (last 7 days)
- Send via Mail provider abstraction
- Logs with requestId; metrics via Micrometer
- Unit tests for business logic
```

---

## 21) Done Definition (Backend – Spring)
- [ ] Story AC биелсэн
- [ ] Checkstyle/SpotBugs ✓
- [ ] Unit + Integration tests ✓ (critical ≥ 80% coverage)
- [ ] OpenAPI шинэчлэгдсэн
- [ ] Security (RBAC/RateLimit/Validation) шалгасан
- [ ] Logs/metrics OK
- [ ] PR checklist ✓
